import { useState, useEffect, useRef, useCallback } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import {
  fetchMemories,
  uploadPhoto,
  insertMemory,
  isSupabaseConfigured,
  type Memory,
} from "../lib/supabase";
import dangerSkull from "../assets/danger-skull.png";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Signal Archive — Danger Boys" },
      { name: "description", content: "Private photo memories for Danger Boys." },
    ],
  }),
  component: MemoriesPage,
});

// ─── Upload Modal ────────────────────────────────────────────────────────────

interface UploadModalProps {
  uploaderName: string;
  onClose: () => void;
  onUploaded: () => void;
}

function UploadModal({ uploaderName, onClose, onUploaded }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pickFile = (picked: File) => {
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) pickFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) pickFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { setError("SELECT A PHOTO FIRST."); return; }
    setUploading(true);
    setError("");
    try {
      const url = await uploadPhoto(file, uploaderName);
      await insertMemory(uploaderName, url, caption.trim() || null);
      onUploaded();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message.toUpperCase() : "UPLOAD FAILED. TRY AGAIN.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg border-2 border-danger/50 bg-panel">
        {/* Corner accents */}
        <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-danger" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-danger" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-danger" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-danger" />

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] text-danger">// NEW MEMORY</p>
              <h2 className="mt-1 font-display text-3xl text-paper">UPLOAD SIGNAL</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-paper/40 hover:text-paper transition-colors text-xs font-semibold tracking-widest mt-1"
              aria-label="Close upload modal"
            >
              ✕ CLOSE
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Drop zone */}
            <div
              className={`relative border-2 border-dashed transition-colors cursor-pointer ${isDragging ? "border-danger bg-danger/10" : "border-paper/20 hover:border-danger/50"}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="Select photo to upload"
              />
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-56 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/60 opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-xs font-semibold tracking-widest text-paper">CHANGE PHOTO</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
                  <img src={dangerSkull} alt="" width={1024} height={1024} className="size-10 object-contain opacity-30" />
                  <p className="text-sm font-medium text-paper/50 tracking-wide">DROP PHOTO HERE OR CLICK TO BROWSE</p>
                  <p className="text-[10px] tracking-widest text-paper/30">JPG, PNG, WEBP, HEIC</p>
                </div>
              )}
            </div>

            {/* Caption */}
            <div>
              <label htmlFor="caption" className="block text-[10px] font-semibold tracking-[0.3em] text-danger mb-2">
                // CAPTION (OPTIONAL)
              </label>
              <input
                id="caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="WHAT'S THE STORY?"
                maxLength={200}
                className="w-full border-2 border-paper/20 bg-ink px-4 py-3 text-sm font-medium tracking-wide text-paper placeholder:text-paper/30 focus:border-danger focus:outline-none transition-colors"
              />
            </div>

            {/* Uploader label */}
            <p className="text-[10px] tracking-widest text-paper/40">
              UPLOADING AS: <span className="text-danger font-semibold">{uploaderName}</span>
            </p>

            {/* Error */}
            {error && (
              <div className="border border-danger/50 bg-danger/10 px-4 py-3">
                <p className="text-xs font-semibold tracking-[0.2em] text-danger">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !file}
              className="group w-full bg-danger px-6 py-4 text-sm font-semibold tracking-[0.2em] text-ink transition-colors hover:bg-paper disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {uploading ? (
                <>
                  <span className="signal-pulse size-2 bg-ink inline-block" />
                  TRANSMITTING...
                </>
              ) : (
                <>
                  <img src={dangerSkull} alt="" width={1024} height={1024} className="size-4 object-contain" />
                  LOCK IN MEMORY
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  memory: Memory;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

function Lightbox({ memory, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const date = new Date(memory.created_at).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/95 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 text-paper/50 hover:text-paper transition-colors text-xs font-semibold tracking-widest"
        aria-label="Close lightbox"
      >
        ✕ CLOSE
      </button>

      <div className="relative max-w-4xl w-full flex flex-col items-center gap-4">
        {/* Nav arrows */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-danger hover:text-paper transition-colors text-2xl font-bold hidden sm:block"
            aria-label="Previous photo"
          >
            ←
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-danger hover:text-paper transition-colors text-2xl font-bold hidden sm:block"
            aria-label="Next photo"
          >
            →
          </button>
        )}

        <img
          src={memory.photo_url}
          alt={memory.caption ?? `Memory by ${memory.uploader_name}`}
          className="max-h-[70vh] w-full object-contain border border-danger/20"
        />

        <div className="w-full flex items-start justify-between gap-4 px-1">
          <div>
            {memory.caption && (
              <p className="text-sm text-paper/80 font-medium">{memory.caption}</p>
            )}
            <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-danger">
              {memory.uploader_name} · {date}
            </p>
          </div>
          {/* Mobile nav */}
          <div className="flex gap-4 sm:hidden">
            {hasPrev && <button onClick={onPrev} className="text-danger text-lg font-bold" aria-label="Previous">←</button>}
            {hasNext && <button onClick={onNext} className="text-danger text-lg font-bold" aria-label="Next">→</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

function MemoriesPage() {
  const { session, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !session) {
      void navigate({ to: "/login" });
    }
  }, [loading, session, navigate]);

  const loadMemories = useCallback(async () => {
    setFetching(true);
    setFetchError("");
    try {
      const data = await fetchMemories();
      setMemories(data);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Failed to load memories.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (session) void loadMemories();
  }, [session, loadMemories]);

  const handleLogout = () => {
    logout();
    void navigate({ to: "/" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <span className="signal-pulse size-3 bg-danger" />
      </div>
    );
  }

  if (!session) return null; // redirecting

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink font-body text-paper antialiased selection:bg-danger selection:text-ink">
      {/* Header */}
      <header className="relative z-20 border-b-2 border-danger/70 sticky top-0 bg-ink">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-5 text-[10px] sm:px-8 sm:text-xs">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={dangerSkull} alt="" width={1024} height={1024} className="size-6 object-contain" />
              <span className="font-semibold tracking-[0.25em] group-hover:text-danger transition-colors">
                DB /// SIGNAL ARCHIVE
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-medium tracking-[0.2em] text-danger sm:flex items-center gap-1.5">
              <span className="signal-pulse size-1.5 bg-danger inline-block" />
              {session.name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-paper/20 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-paper/50 transition-colors hover:border-danger hover:text-danger cursor-pointer"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-danger/30">
        <div className="pointer-events-none absolute inset-0 skull-field opacity-[0.025]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-danger">// PRIVATE CHANNEL</p>
              <h1 className="mt-2 font-display text-6xl leading-none text-paper sm:text-8xl">
                SIGNAL<br />
                <span className="text-danger">ARCHIVE</span>
              </h1>
              <p className="mt-4 max-w-[38ch] text-sm text-paper/60">
                Locked memories. Only the frequency knows. Upload yours, keep the signal alive.
              </p>
            </div>
            {isSupabaseConfigured && (
              <button
                type="button"
                onClick={() => setShowUpload(true)}
                className="group inline-flex items-center gap-3 bg-danger px-6 py-4 text-sm font-semibold tracking-[0.15em] text-ink transition-colors hover:bg-paper shrink-0"
                id="upload-memory-btn"
              >
                <img src={dangerSkull} alt="" width={1024} height={1024} className="size-4 object-contain" />
                UPLOAD MEMORY
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16">
        {!isSupabaseConfigured ? (
          // Supabase not set up yet
          <div className="border-2 border-danger/30 bg-panel p-10 text-center">
            <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-danger" />
            <img src={dangerSkull} alt="" width={1024} height={1024} className="mx-auto mb-4 size-12 object-contain opacity-40" />
            <p className="text-[11px] font-semibold tracking-[0.3em] text-danger mb-2">// SIGNAL NOT CONNECTED</p>
            <h2 className="font-display text-3xl text-paper mb-4">SUPABASE NOT CONFIGURED</h2>
            <p className="text-sm text-paper/60 max-w-[42ch] mx-auto leading-relaxed">
              Add your Supabase credentials to <code className="text-danger bg-ink px-1">.env.local</code> to enable photo storage.
              See the README for setup instructions.
            </p>
            <div className="mt-6 inline-block border border-paper/20 bg-ink px-6 py-4 text-left">
              <p className="text-[10px] tracking-widest text-paper/40 mb-2">// .env.local</p>
              <code className="text-xs text-paper/70 font-mono">
                VITE_SUPABASE_URL=https://xxx.supabase.co<br />
                VITE_SUPABASE_ANON_KEY=your-anon-key<br />
                VITE_DB_PASSCODE=YOURPASSCODE
              </code>
            </div>
          </div>
        ) : fetching ? (
          // Loading state
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="signal-pulse size-3 bg-danger" />
            <p className="text-[10px] tracking-[0.3em] text-paper/40">SCANNING ARCHIVE...</p>
          </div>
        ) : fetchError ? (
          // Error state
          <div className="border border-danger/40 bg-danger/10 p-6 text-center">
            <p className="text-xs font-semibold tracking-widest text-danger">{fetchError}</p>
            <button
              onClick={() => void loadMemories()}
              className="mt-4 border border-danger/40 px-4 py-2 text-xs font-semibold tracking-widest text-danger hover:bg-danger/10 transition-colors"
            >
              RETRY SIGNAL
            </button>
          </div>
        ) : memories.length === 0 ? (
          // Empty state
          <div className="border-2 border-dashed border-paper/15 p-16 text-center">
            <img src={dangerSkull} alt="" width={1024} height={1024} className="mx-auto mb-4 size-12 object-contain opacity-20" />
            <p className="text-[11px] font-semibold tracking-[0.3em] text-danger mb-2">// NO SIGNAL YET</p>
            <h2 className="font-display text-3xl text-paper mb-3">ARCHIVE EMPTY</h2>
            <p className="text-sm text-paper/50">Be the first to drop a memory into the frequency.</p>
            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="mt-6 inline-flex items-center gap-2 bg-danger px-5 py-3 text-sm font-semibold tracking-widest text-ink hover:bg-paper transition-colors"
            >
              UPLOAD FIRST MEMORY →
            </button>
          </div>
        ) : (
          // Photo grid
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="signal-pulse size-2 bg-danger" />
                <p className="text-[10px] font-semibold tracking-[0.3em] text-paper/50">
                  {memories.length} {memories.length === 1 ? "MEMORY" : "MEMORIES"} IN ARCHIVE
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUpload(true)}
                className="border border-danger/50 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-danger hover:bg-danger hover:text-ink transition-colors cursor-pointer"
              >
                + ADD MEMORY
              </button>
            </div>

            <div className="columns-2 gap-px sm:columns-3 lg:columns-4">
              {memories.map((memory, idx) => {
                const date = new Date(memory.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                return (
                  <button
                    key={memory.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative mb-px block w-full overflow-hidden bg-panel text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                    aria-label={`View memory by ${memory.uploader_name}${memory.caption ? `: ${memory.caption}` : ""}`}
                  >
                    <img
                      src={memory.photo_url}
                      alt={memory.caption ?? `Memory by ${memory.uploader_name}`}
                      loading="lazy"
                      className="w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      {memory.caption && (
                        <p className="text-xs text-paper line-clamp-2 font-medium">{memory.caption}</p>
                      )}
                      <p className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-danger">{memory.uploader_name} · {date}</p>
                    </div>
                    {/* Number badge */}
                    <span className="absolute left-2 top-2 font-display text-lg text-danger drop-shadow opacity-80">
                      {String(memories.length - idx).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-danger/40">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-5 py-8 text-[11px] font-medium tracking-[0.2em] text-paper/40 sm:flex-row sm:items-center sm:px-8">
          <p>DANGER BOYS /// SIGNAL ARCHIVE</p>
          <p className="text-danger/80">FREQUENCY LOCKED — MEMBERS ONLY</p>
        </div>
      </footer>

      {/* Upload modal */}
      {showUpload && (
        <UploadModal
          uploaderName={session.name}
          onClose={() => setShowUpload(false)}
          onUploaded={() => void loadMemories()}
        />
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && memories[lightboxIndex] && (
        <Lightbox
          memory={memories[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i !== null ? Math.max(0, i - 1) : null))}
          onNext={() => setLightboxIndex((i) => (i !== null ? Math.min(memories.length - 1, i + 1) : null))}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < memories.length - 1}
        />
      )}
    </main>
  );
}
