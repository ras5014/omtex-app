import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

import { Outlet } from "react-router";
export default function AuthLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Dark mode toggle positioned at the rightmost side */}
      <div className="fixed top-2 right-2 z-99">
        <ModeToggle />
      </div>
      <Outlet />
    </ThemeProvider>
  );
}
