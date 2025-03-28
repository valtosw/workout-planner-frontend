import { ToastProvider } from "@heroui/react";

import { Navbar } from "../components/NavbarComponents/Navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="mx-auto w-full px-6 flex-grow pt-5 overflow-hidden">
        <ToastProvider />
        {children}
      </main>
    </div>
  );
}
