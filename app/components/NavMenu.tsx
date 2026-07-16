'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/daily-plan', label: 'Daily Plan' },
    { href: '/mock-tests', label: 'Mock Tests' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/resources', label: 'Resources' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-purple-200 hover:text-white transition-colors"
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
              pathname === link.href ? 'text-white font-medium' : 'text-purple-200 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-slate-900/95 backdrop-blur-md">
          <div className="flex flex-col items-center gap-2 pt-8 px-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`w-full text-center py-4 rounded-xl text-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-purple-200 hover:bg-white/10 hover:text-white'
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
