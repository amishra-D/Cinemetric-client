"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const pages = [
  { name: "Home", route: "/" },
  { name: "System Overview", route: "/system-overview" },
  { name: "Model Evaluation", route: "/model-evaluation" },
  { name: "About CineMetric", route: "/about" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6 z-40">
        <span className="text-yellow-500 font-bold text-lg">CineMetric</span>
        <button onClick={() => setOpen(true)} className="p-2 text-white">
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-neutral-900 border-r border-neutral-800
        flex flex-col p-6 transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:fixed lg:h-full
      `}>
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-xl font-bold text-yellow-500">CineMetric</h1>
          <button onClick={() => setOpen(false)} className="lg:hidden text-gray-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {pages.map((page) => (
            <Link
              key={page.route}
              href={page.route}
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-yellow-400 hover:bg-neutral-800 rounded-md transition-all"
            >
              {page.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}