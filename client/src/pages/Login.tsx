import { useState } from "react";
import Button from "../components/UI/button/Button";
import { usePageStore } from "../store/page";
import { api, setToken } from "../lib/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const setPage          = usePageStore((s) => s.setPage);
  const setDashboardMode = usePageStore((s) => s.setDashboardMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { token } = await api<{ token: string }>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(token);
      setDashboardMode("user");
      setPage("dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-md border p-6 shadow"
      >
        <h1 className="text-center text-xl font-semibold">Log in</h1>

        <div className="space-y-1">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2 text-black"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2 text-black"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" isLoading={loading}>
          Sign in
        </Button>

        <Link
          to="/register"
          onClick={() => setPage("register")}
          className="font-synth text-blue transition-all hover:text-yellow"
        >
          Create account
        </Link>
      </form>
    </div>
  );
}
