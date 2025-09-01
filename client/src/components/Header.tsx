import { Link } from "react-router-dom";
import { usePageStore } from "../store/page";

const Header: React.FC = () => {
  const dashboardMode = usePageStore((s) => s.dashboardMode);
  const setPage = usePageStore((s) => s.setPage);
  const setDashboardMode = usePageStore((s) => s.setDashboardMode);

  const logout = () => {
    setDashboardMode("guest");
    setPage("dashboard");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple/40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* neon logo */}
        <Link
          to="/"
          onClick={() => setPage("dashboard")}
          className="text-2xl font-synth tracking-wider text-pink drop-shadow-[0_0_6px_#ff7edb]"
        >
          SynthTodo
        </Link>

        {/* nav */}
        <nav className="hidden space-x-6 md:block">
          {dashboardMode === "guest" ? (
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/login"
                  onClick={() => setPage("login")}
                  className="font-synth text-blue transition-all hover:text-yellow"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setPage("register")}
                  className="font-synth text-blue transition-all hover:text-yellow"
                >
                  Register
                </Link>
              </li>
            </ul>
          ) : (
            <>
              <Link
                to="/account"
                onClick={() => setPage("account")}
                className="font-synth text-blue transition-all hover:text-yellow"
              >
                Account
              </Link>
              <button
                onClick={logout}
                className="font-synth text-red transition-all hover:text-yellow"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
