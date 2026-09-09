const SESSION_KEY = "db_session";

// The shared passcode for all DB members.
// Set VITE_DB_PASSCODE in your .env.local to change it.
const PASSCODE = (import.meta.env["VITE_DB_PASSCODE"] as string | undefined) ?? "DANGERBOYS25";

export const MEMBERS = [
  "ABDULLA",
  "ADITH",
  "ASH",
  "DEVANAND",
  "GOTHAM",
  "JOEL",
  "NAJAD",
  "NASEEF",
  "PRANAV",
  "RABEEATH",
  "SANAD",
  "SHABAS",
  "SHAMIR",
  "SOURAV",
  "YADHU",
] as const;

export type Member = (typeof MEMBERS)[number];

export interface Session {
  name: Member;
  loggedIn: boolean;
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    if (session.loggedIn && (MEMBERS as readonly string[]).includes(session.name)) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

export function login(name: Member, passcode: string): boolean {
  if (passcode.trim().toUpperCase() !== PASSCODE.toUpperCase()) return false;
  const session: Session = { name, loggedIn: true };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return true;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}
