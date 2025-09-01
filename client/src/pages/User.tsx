import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Button from "../components/UI/button/Button";

type Me = {
  sub: number;
  email?: string;
  iat?: number;
  exp?: number;
};

export default function User() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api<Me>("/me", { method: "GET" }, true);
        setMe(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error)   return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Account</h1>
      <div className="rounded border p-4 space-y-2">
        <p><span className="opacity-70">User ID:</span> {me?.sub}</p>
        {me?.email && <p><span className="opacity-70">Email:</span> {me.email}</p>}
        {me?.iat && <p><span className="opacity-70">Issued:</span> {new Date(me.iat * 1000).toLocaleString()}</p>}
        {me?.exp && <p><span className="opacity-70">Expires:</span> {new Date(me.exp * 1000).toLocaleString()}</p>}
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => window.history.back()}>
          Back
        </Button>
      </div>
    </div>
  );
}
