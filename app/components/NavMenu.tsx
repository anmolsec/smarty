'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

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
        className={`mobile-menu-trigger ${open ? 'is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        <span>Menu</span>
        <span className="menu-bars" aria-hidden="true"><i /><i /><i /></span>
      </button>

      <div className="desktop-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? 'page' : undefined}
            className={pathname === link.href ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {open && (
        <>
          <button className="mobile-menu-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="mobile-menu-panel" id="mobile-navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={pathname === link.href ? 'active' : ''}
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
