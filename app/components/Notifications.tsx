'use client';

import { Bell, CheckCheck, ChevronRight, Clock3, LogIn, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Notice = {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
  kind: 'plan' | 'exam' | 'account';
};

function nextStudyNotice(): Notice {
  const hour = new Date().getHours();
  if (hour < 10) return { id: 'plan', title: 'Today’s focus is ready', detail: 'Open your Daily Plan and begin with one clear task.', time: 'Now', unread: true, kind: 'plan' };
  if (hour < 18) return { id: 'exam', title: 'Practice window is open', detail: 'A short, timed sample set is ready when you are.', time: 'Today', unread: true, kind: 'exam' };
  return { id: 'review', title: 'Close the learning loop', detail: 'Review one mistake and set tomorrow’s first task.', time: 'This evening', unread: true, kind: 'plan' };
}

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const syncNotices = () => {
      const storedRead = window.localStorage.getItem('foundation-read-notices');
      const readIds: string[] = storedRead ? JSON.parse(storedRead) : [];
      const account: Notice = { id: 'account', title: 'Sign in to sync your progress', detail: 'Your tasks and test reviews currently stay on this device.', time: 'Account', unread: !readIds.includes('account'), kind: 'account' };
      const current = nextStudyNotice();
      setNotices([current, account].map((notice) => ({ ...notice, unread: notice.unread && !readIds.includes(notice.id) })));
    };
    syncNotices();
    const refresh = window.setInterval(syncNotices, 60_000);
    return () => window.clearInterval(refresh);
  }, []);

  const unread = useMemo(() => notices.filter((notice) => notice.unread).length, [notices]);
  const markRead = () => {
    const ids = notices.map((notice) => notice.id);
    window.localStorage.setItem('foundation-read-notices', JSON.stringify(ids));
    setNotices((items) => items.map((notice) => ({ ...notice, unread: false })));
  };

  return (
    <div className="notification-wrap">
      <button className="notification-trigger" onClick={() => setOpen((value) => !value)} aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`} aria-expanded={open}>
        <Bell size={20} />
        {unread > 0 && <span className="notification-badge">{unread > 9 ? '9+' : unread}</span>}
      </button>
      {open && <>
        <button className="notification-scrim" aria-label="Close notifications" onClick={() => setOpen(false)} />
        <section className="notification-panel" aria-label="Notifications">
          <header><div><p>Updates</p><h2>Stay in the loop</h2></div><button aria-label="Close notifications" onClick={() => setOpen(false)}><X size={19} /></button></header>
          <div className="notice-list">
            {notices.map((notice) => <article className={`notice ${notice.unread ? 'unread' : ''}`} key={notice.id}>
              <span className={`notice-icon ${notice.kind}`}>{notice.kind === 'account' ? <LogIn size={16} /> : notice.kind === 'exam' ? <Clock3 size={16} /> : <ChevronRight size={16} />}</span>
              <div><div className="notice-topline"><h3>{notice.title}</h3><time>{notice.time}</time></div><p>{notice.detail}</p>{notice.kind === 'account' && <span className="sync-note">Login will be enabled when an account provider is connected.</span>}</div>
            </article>)}
          </div>
          <footer><button onClick={markRead}><CheckCheck size={16} /> Mark all read</button></footer>
        </section>
      </>}
    </div>
  );
}
