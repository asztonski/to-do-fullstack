import Button from "../components/UI/button/Button";
import { usePageStore } from "../store/page";

export default function User() {
  const setPage = usePageStore((s) => s.setPage);
  const setDashboardMode = usePageStore((s) => s.setDashboardMode);

  const logout = () => {
    setDashboardMode("guest");
    setPage("dashboard");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Account</h1>
      <p className="text-sm text-purple-400">User details coming soon.</p>

      <Button variant="danger" onClick={logout}>
        Log out
      </Button>
    </div>
  );
}
