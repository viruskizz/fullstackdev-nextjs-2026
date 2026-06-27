import Link from "next/link";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Artists", href: "/artists" },
  { name: "Products", href: "/products" },
  { name: "Songs", href: "/songs" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0F0F0F] px-6 py-8 text-[#AAAAAA]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Next2026</p>
          <p className="text-sm text-slate-400">A simple music app built with Next.js.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-800 pt-4 text-xs text-slate-500 sm:text-right">
        © {new Date().getFullYear()} Next2026. Built with Next.js.
      </div>
    </footer>
  );
}
