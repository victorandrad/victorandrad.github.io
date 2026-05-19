import React, { useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import TypedText from "./TypedText";
import { Icon } from '@iconify/react';

interface HeaderProps {
  sharedData: any;
  checked?: any;
}

// Career start — used to compute the uptime shown in the hero
const CAREER_START = new Date(2018, 6, 1); // July 2018

function formatUptime(from: Date, to: Date = new Date()): string {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years < 1) return `${months}mo`;
  if (months === 0) return `${years}y`;
  return `${years}y ${months}mo`;
}

function getSystemPrefersDark(): boolean {
  try {
    return typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

function getInitialTheme(): 'light' | 'dark' {
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'light' || stored === 'dark') return stored;
  } catch { /* ignore */ }
  return getSystemPrefersDark() ? 'dark' : 'light';
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
}

export default function Header({ sharedData }: HeaderProps) {
  const [name, setName] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean>(() => getInitialTheme() === 'dark');
  const uptime = formatUptime(CAREER_START);

  useEffect(() => {
    if (sharedData) {
      setName(sharedData.name);
      setTitles(sharedData.titles.map((x: string) => x.toUpperCase()));
    }
  }, [sharedData]);

  // Apply the initial theme to the DOM on mount (in case the inline boot script didn't)
  useEffect(() => {
    applyTheme(checked ? 'dark' : 'light');
    // intentionally only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for OS theme changes — only follow when user hasn't manually overridden
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem('theme')) return; // manual override wins
      } catch { /* ignore */ }
      setChecked(e.matches);
      applyTheme(e.matches ? 'dark' : 'light');
    };
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
    // Safari < 14 fallback
    // @ts-ignore
    mql.addListener(handler);
    // @ts-ignore
    return () => mql.removeListener(handler);
  }, []);

  function onThemeSwitchChange(next: boolean) {
    setChecked(next);
    const theme: 'light' | 'dark' = next ? 'dark' : 'light';
    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch { /* ignore */ }
  }

  const HeaderTitleTypeAnimation = React.memo(() => {
    return <TypedText
      strings={titles}
      style={{ marginTop: 0, marginBottom: 0 }}
      className="title-styles"
      loop={true}
      typeSpeed={70}
      backSpeed={50}
      backDelay={1500}
    />;
  }, (props, prevProp) => true);

  return (
    <header id="home" className="hero">
      <div className="hero-statusbar">
        <span className="hero-statusbar-item">
          <Icon icon="la:laptop-code" className="header-icon" />
          <span>victorandra.de</span>
        </span>
        <span className="hero-statusbar-sep">·</span>
        <span className="hero-statusbar-item">
          <span className="hero-pulse" /> deployed
        </span>
        <span className="hero-statusbar-sep hero-statusbar-optional">·</span>
        <span className="hero-statusbar-item mono hero-statusbar-optional">
          main@1285824
        </span>
        <span className="hero-statusbar-sep hero-statusbar-optional">·</span>
        <span className="hero-statusbar-item mono hero-statusbar-optional">
          v2026.05
        </span>
      </div>

      <div className="hero-greeting">
        <span className="hero-greeting-mono">{'>'} hello, world.</span>
      </div>

      <h1 className="hero-name">
        <TypedText strings={[name]} loop={false} typeSpeed={100} once />
      </h1>

      <div className="hero-role title-container">
        <span className="hero-role-prompt">role:</span>
        <HeaderTitleTypeAnimation />
      </div>

      <div className="hero-actions">
        <div className="hero-theme">
          <ReactSwitch
            checked={checked}
            onChange={onThemeSwitchChange}
            offColor="#e5e5e5"
            onColor="#16a34a"
            offHandleColor="#16a34a"
            onHandleColor="#bbf7d0"
            className="react-switch"
            width={56}
            height={28}
            handleDiameter={22}
            uncheckedIcon={false}
            checkedIcon={false}
            id="icon-switch"
          />
          <code className="hero-theme-label">
            {checked ? '--theme=dark' : '--theme=light'}
          </code>
        </div>
        <div className="hero-meta">
          <span className="hero-meta-key">uptime:</span>
          <span className="hero-meta-val">{uptime}</span>
        </div>
      </div>
    </header>
  );
}
