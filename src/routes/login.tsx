import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { login, MEMBERS, type Member, getSession } from "../lib/auth";
import dangerSkull from "../assets/danger-skull.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Access Control — Danger Boys" },
      { name: "description", content: "Restricted access. Danger Boys members only." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState<Member | "">("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  // Redirect already-logged-in members
  useEffect(() => {
    if (getSession()) {
      void navigate({ to: "/memories" });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedName) {
      setError("SELECT YOUR SIGNAL BEFORE TRANSMITTING.");
      triggerShake();
      return;
    }

    const success = login(selectedName as Member, passcode);
    if (success) {
      void navigate({ to: "/memories" });
    } else {
      setError("WRONG PASSCODE. TRANSMISSION BLOCKED.");
      setPasscode("");
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink font-body text-paper antialiased selection:bg-danger selection:text-ink flex flex-col">
      {/* Header */}
      <header className="relative z-20 border-b-2 border-danger/70">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-5 text-[10px] sm:px-8 sm:text-xs">
          <div className="flex items-center gap-2">
            <img src={dangerSkull} alt="" width={1024} height={1024} className="size-6 object-contain" />
            <span className="signal-pulse size-2 shrink-0 bg-danger" aria-hidden="true" />
            <span className="font-semibold tracking-[0.25em]">DB /// ACCESS CONTROL</span>
          </div>
          <span className="hidden font-medium tracking-[0.25em] text-paper/50 sm:block">RESTRICTED CHANNEL</span>
          <span className="font-semibold tracking-[0.2em] text-danger sm:tracking-[0.25em]">MEMBERS ONLY</span>
        </div>
      </header>

      {/* Login form */}
      <div className="flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
        <div className="relative w-full max-w-md">
          {/* Background skull */}
          <img
            src={dangerSkull}
            alt=""
            aria-hidden="true"
            className="skull-drift pointer-events-none absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.04] select-none"
          />

          <div
            className={`relative border-2 border-danger/40 bg-panel p-8 sm:p-10 transition-all duration-150 ${isShaking ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
            style={
              isShaking
                ? {
                    animation: "shake 0.5s ease-in-out",
                  }
                : {}
            }
          >
            {/* Corner accents */}
            <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-danger" />
            <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-danger" />
            <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-danger" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-danger" />

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <img src={dangerSkull} alt="" width={1024} height={1024} className="size-8 object-contain" />
                <span className="h-px flex-1 bg-danger/40" />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.3em] text-danger">// TRANSMISSION 002</p>
              <h1 className="mt-2 font-display text-5xl sm:text-6xl leading-none text-paper">
                ACCESS<br />
                <span className="text-danger">CONTROL</span>
              </h1>
              <p className="mt-4 text-sm text-paper/50 tracking-wide">
                Danger Boys members only. Select your name and enter the group passcode.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name selector */}
              <div>
                <label htmlFor="member-name" className="block text-[10px] font-semibold tracking-[0.3em] text-danger mb-2">
                  // IDENTIFY SIGNAL
                </label>
                <div className="relative">
                  <select
                    id="member-name"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value as Member | "")}
                    className="w-full appearance-none border-2 border-paper/20 bg-ink px-4 py-3 text-sm font-medium tracking-wide text-paper focus:border-danger focus:outline-none transition-colors cursor-pointer"
                    required
                  >
                    <option value="" disabled className="text-paper/40">
                      SELECT YOUR NAME
                    </option>
                    {MEMBERS.map((name) => (
                      <option key={name} value={name} className="bg-ink text-paper">
                        {name}
                      </option>
                    ))}
                  </select>
                  {/* Custom arrow */}
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-danger text-xs font-bold">▼</span>
                </div>
              </div>

              {/* Passcode input */}
              <div>
                <label htmlFor="passcode" className="block text-[10px] font-semibold tracking-[0.3em] text-danger mb-2">
                  // GROUP PASSCODE
                </label>
                <div className="relative">
                  <input
                    id="passcode"
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="ENTER PASSCODE"
                    autoComplete="off"
                    className="w-full border-2 border-paper/20 bg-ink px-4 py-3 pr-12 text-sm font-medium tracking-[0.15em] text-paper placeholder:text-paper/30 focus:border-danger focus:outline-none transition-colors uppercase"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/40 hover:text-paper transition-colors text-xs"
                    aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
                  >
                    {showPasscode ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="border border-danger/50 bg-danger/10 px-4 py-3">
                  <p className="text-xs font-semibold tracking-[0.2em] text-danger">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="group w-full bg-danger px-6 py-4 text-sm font-semibold tracking-[0.2em] text-ink transition-colors hover:bg-paper flex items-center justify-center gap-3 mt-2"
              >
                <img src={dangerSkull} alt="" width={1024} height={1024} className="size-4 object-contain" />
                TRANSMIT CREDENTIALS
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>

            {/* Footer note */}
            <p className="mt-6 text-center text-[10px] tracking-[0.15em] text-paper/30">
              ONE FREQUENCY · FIFTEEN SIGNALS · NO INTRUDERS
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
      `}</style>
    </main>
  );
}
