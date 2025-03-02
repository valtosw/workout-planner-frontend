import { Link } from "@heroui/link";

import { LandingNavbar } from "@/components/navbar-components/landing-navbar";

export default function LandingDefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <LandingNavbar />
      <main className="mx-auto w-full px-6 flex-grow pt-16">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com"
          title="heroui.com homepage"
        />
      </footer>
    </div>
  );
}
