'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/daily-plan', label: 'Daily Plan' },
    { href: '/chapters', label: 'Chapters' },
    { href: '/mock-tests', label: 'Mock Tests' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/resources', label: 'Resources' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`mobile-menu-trigger md:hidden p-2 transition-all ${open ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${
              pathname === link.href ? 'text-[#174f3a] font-semibold' : 'text-[#68746c] hover:text-[#174f3a]'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {open && (
        <div className="mobile-menu-overlay md:hidden fixed inset-0 z-50 bg-[#f7f7f3]/94 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-2 pt-[max(5rem,calc(env(safe-area-inset-top)+3rem))] px-4">
            <button className="mobile-menu-close" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`w-full text-center py-4 rounded-xl text-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-[#dce8df] text-[#174f3a] font-semibold'
                    : 'text-[#59675e] hover:bg-white hover:text-[#174f3a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
