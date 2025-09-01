import { create } from "zustand";

/* --------------------------- types --------------------------- */
export type Page = "dashboard" | "login" | "account";
export type DashboardMode = "guest" | "user";

interface PageState {
  page: Page; // current route name
  dashboardMode: DashboardMode; // guest vs. logged-in view

  setPage: (p: Page) => void;
  setDashboardMode: (m: DashboardMode) => void;
}

/* --------------------------- store --------------------------- */
export const usePageStore = create<PageState>((set) => ({
  // defaults
  page: "dashboard",
  dashboardMode: "guest",

  // actions
  setPage: (page) => set({ page }),
  setDashboardMode: (mode) => set({ dashboardMode: mode }),
}));
