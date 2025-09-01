import { useState } from "react";
import Button from "../components/UI/button/Button";
import { api, setToken } from "../lib/api";
import { usePageStore } from "../store/page";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setPage = usePageStore((s) => s.setPage);
  const setDashboardMode = usePageStore((s) => s.setDashboardMode);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 1) create account
      await api<void>("/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // 2) auto-login
      const { token } = await api<{ token: string }>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setToken(token);
      setDashboardMode("user");
      setPage("dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-md border p-6 shadow"
      >
        <h1 className="text-center text-xl font-semibold">Create account</h1>

        <div className="space-y-1">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full rounded border p-2 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full rounded border p-2 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" isLoading={loading}>
          Sign up
        </Button>

        <Link
          to="/login"
          onClick={() => setPage("login")}
          className="font-synth text-blue transition-all hover:text-yellow"
        >
          I already have an account
        </Link>
      </form>
    </div>
  );
}
