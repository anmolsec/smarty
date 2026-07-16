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
    { href: '/flashcards', label: 'Flashcards' },
    { href: '/mock-tests', label: 'Mock Tests' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/resources', label: 'Resources' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`mobile-menu-trigger md:hidden ${open ? 'is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span>Menu</span>
        <span className="menu-bars" aria-hidden="true"><i /><i /><i /></span>
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
        <>
          <button className="mobile-menu-scrim md:hidden" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="mobile-menu-panel md:hidden">
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
        </>
      )}
    </>
  );
}
