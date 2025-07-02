import { useState } from "react";
import Button from "../components/UI/button/Button";
import { usePageStore } from "../store/page";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const setPage          = usePageStore((s) => s.setPage);
  const setDashboardMode = usePageStore((s) => s.setDashboardMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* TODO: hook up real auth */
    setDashboardMode("user");
    setPage("dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center">
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

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
}
