import { useEffect } from "react";
import { api, getToken, setToken, setOnUnauthorized } from "./lib/api";
import { usePageStore } from "./store/page";

import Page from "./components/Page";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import User from "./pages/User";
import History from "./pages/History";
import Register from "./pages/Register";

export default function App() {
  const page = usePageStore((s) => s.page);
  const setDashboardMode = usePageStore((s) => s.setDashboardMode);

  // 1) Globalny auto-logout: każdy 401 z api() czyści token i wraca do /login
  useEffect(() => {
    setOnUnauthorized(() => {
      setToken(null);
      const s = usePageStore.getState(); // unikamy zależności w efektach
      s.setDashboardMode("guest");
      s.setPage("login");
    });
  }, []);

  // 2) Auto-login: jeśli token istnieje, potwierdź go /me i ustaw tryb 'user'
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setDashboardMode("guest");
      return;
    }
    (async () => {
      try {
        await api("/me", { method: "GET" }, true);
        setDashboardMode("user");
      } catch {
        setToken(null);
        setDashboardMode("guest");
      }
    })();
  }, [setDashboardMode]);

  // pick the current page component
  let content: JSX.Element;
  switch (page) {
    case "login":
      content = <Login />;
      break;
    case "register":
      content = <Register />;
      break;
    case "account":
      content = <User />;
      break;
    case "history":
      content = <History />;
      break;
    case "dashboard":
    default:
      content = <Dashboard />;
  }

  // title for the <Page> wrapper
  const titles: Record<string, string> = {
    dashboard: "Dashboard",
    login: "Login",
    register: "Register",
    account: "Account",
    history: "History",
  };

  return <Page title={titles[page]}>{content}</Page>;
}
