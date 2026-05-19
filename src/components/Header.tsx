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

export default function Header({ sharedData }: HeaderProps) {
  const [name, setName] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const uptime = formatUptime(CAREER_START);

  useEffect(() => {
    if (sharedData) {
      setName(sharedData.name);
      setTitles(sharedData.titles.map((x: string) => x.toUpperCase()));
    }
  }, [sharedData]);

  function onThemeSwitchChange(checked: any) {
    setChecked(checked);
    setTheme();
  }

  function setTheme() {
    const body = document.body;
    const newTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
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
        <TypedText strings={[name]} loop={false} typeSpeed={100} />
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
