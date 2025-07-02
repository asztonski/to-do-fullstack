import { usePageStore } from "./store/page";

import Page from "./components/Page";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import User from "./pages/User";
import History from "./pages/History";

export default function App() {
  const page = usePageStore((s) => s.page);

  /* pick the current page component */
  let content: React.ReactElement;
  switch (page) {
    case "login":
      content = <Login />;
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

  /* title for the <Page> wrapper */
  const titles: Record<string, string> = {
    dashboard: "Dashboard",
    login: "Login",
    account: "Account",
    history: "History",
  };

  return <Page title={titles[page]}>{content}</Page>;
}
