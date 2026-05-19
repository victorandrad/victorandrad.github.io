import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./App.scss";
import About from './components/About';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';

export default function App() {
  const [language, setLanguage] = useState('res_primaryLanguage.json');
  const [languageTag, setLanguageTag] = useState('pt');
  const primaryLanguage = 'pt';
  const secondaryLanguage = 'en';
  const primaryLanguageIconId = 'primary-lang-icon';
  const secondaryLanguageIconId = 'secondary-lang-icon';
  const [resumeData, setResumeData] = useState<any>({});
  const [sharedData, setSharedData] = useState<any>({});
  const [activeHref, setActiveHref] = useState<string>('#home');
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    axios({
      url: `portfolio_shared_data.json`,
    }).then(data => {
      setSharedData(data.data);
    }).catch(err => {
      alert(err);
    });
  }, []);

  useEffect(() => {
    if (languageTag === primaryLanguage) {
      setLanguage('res_primaryLanguage.json');
      document.getElementById(primaryLanguageIconId)?.setAttribute("filter", "brightness(40%)");
      document.getElementById(secondaryLanguageIconId)?.setAttribute("filter", "brightness(100%)");
    } else if (languageTag === secondaryLanguage) {
      setLanguage('res_secondaryLanguage.json');
      document.getElementById(secondaryLanguageIconId)?.setAttribute("filter", "brightness(40%)");
      document.getElementById(primaryLanguageIconId)?.setAttribute("filter", "brightness(100%)");
    }
  }, [languageTag]);

  useEffect(() => {
    axios({
      url: language,
    }).then(data => {
      setResumeData(data.data);
    }).catch(err => {
      alert(err);
    });
  }, [language]);

  const profileImage = sharedData.basic_info?.image
    ? `images/${sharedData.basic_info.image}`
    : '';

  const titles: string[] = sharedData.basic_info?.titles || [];

  // Auto-cycle the sidebar role through available titles
  useEffect(() => {
    if (titles.length <= 1) return;
    const id = setInterval(() => {
      setRoleIdx(i => (i + 1) % titles.length);
    }, 3500);
    return () => clearInterval(id);
  }, [titles.length]);

  // Scroll-spy: track which section is currently in view
  useEffect(() => {
    const ids = ['home', 'about', 'portfolio', 'skills', 'resume'];
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        // Activation line ~25% from the top of the viewport
        rootMargin: '-25% 0px -65% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [resumeData, sharedData]);

  // Auto-scroll the editor tabs strip to keep the active tab in view
  useEffect(() => {
    const tab = document.querySelector<HTMLElement>(
      `.editor-tab[data-href="${activeHref}"]`
    );
    if (!tab) return;
    const container = tab.parentElement;
    if (!container) return;

    // Only scroll horizontally inside the tabs strip — don't affect page vertical scroll
    const tabLeft = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;
    const containerWidth = container.clientWidth;
    const target = tabLeft - (containerWidth - tabWidth) / 2;

    container.scrollTo({
      left: Math.max(0, target),
      behavior: 'smooth',
    });
  }, [activeHref]);

  const tabs = [
    { path: 'README.md',      ext: 'md',   href: '#home',      label: 'README.md' },
    { path: 'about.md',       ext: 'md',   href: '#about',     label: languageTag === 'pt' ? 'about.md' : 'about.md' },
    { path: 'projects.tsx',   ext: 'tsx',  href: '#portfolio', label: 'projects.tsx' },
    { path: 'stack.json',     ext: 'json', href: '#skills',    label: 'stack.json' },
    { path: 'experience.log', ext: 'log',  href: '#resume',    label: 'experience.log' },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-header">
            <span className="sidebar-dot dot-r" />
            <span className="sidebar-dot dot-y" />
            <span className="sidebar-dot dot-g" />
            <span className="sidebar-header-path">~/portfolio</span>
          </div>

          <div className="sidebar-identity">
            {profileImage && (
              <div className="sidebar-avatar-wrap">
                <img
                  className="sidebar-avatar"
                  src={profileImage}
                  alt={sharedData.basic_info?.name || 'profile'}
                />
                <span className="sidebar-avatar-badge" aria-hidden>●</span>
              </div>
            )}
            <div className="sidebar-name">
              {sharedData.basic_info?.name || ' '}
            </div>
            <div className="sidebar-role">
              <code key={roleIdx}>{titles[roleIdx] || ''}</code>
            </div>
            <div className="sidebar-status">
              <span className="status-dot" />
              <span className="status-text">
                {languageTag === 'pt' ? 'Disponível p/ projetos' : 'Available for hire'}
              </span>
            </div>
          </div>

          <div className="sidebar-section-label">
            <span>EXPLORER</span>
            <span className="sidebar-section-count">5</span>
          </div>

          <nav className="sidebar-tree">
            <div className="tree-folder">
              <span className="tree-folder-row">
                <span className="tree-chev" aria-hidden>▾</span>
                <span className="tree-folder-icon" aria-hidden>📁</span>
                <span className="tree-folder-name">portfolio</span>
              </span>
              <div className="tree-children">
                {tabs.map(tab => (
                  <a
                    key={tab.path}
                    href={tab.href}
                    className={`tree-file ${activeHref === tab.href ? 'active' : ''}`}
                    data-ext={tab.ext}
                  >
                    <span className="tree-file-icon">
                      {tab.ext === 'md' && 'M'}
                      {tab.ext === 'tsx' && 'TS'}
                      {tab.ext === 'json' && '{}'}
                      {tab.ext === 'log' && 'L'}
                    </span>
                    <span className="tree-file-name">{tab.path}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="sidebar-section-label">
            <span>SETTINGS</span>
          </div>

          <div className="sidebar-controls">
            <div className="lang-switcher" role="group" aria-label="Language">
              <button
                className={`lang-btn ${languageTag === 'pt' ? 'active' : ''}`}
                onClick={() => setLanguageTag('pt')}
                aria-label="Português"
              >
                <span
                  className="iconify language-icon"
                  data-icon="twemoji-flag-for-flag-brazil"
                  data-inline="false"
                  id={primaryLanguageIconId}
                />
                <span className="lang-btn-long">pt-BR</span>
                <span className="lang-btn-short">PT</span>
              </button>
              <button
                className={`lang-btn ${languageTag === 'en' ? 'active' : ''}`}
                onClick={() => setLanguageTag('en')}
                aria-label="English"
              >
                <span
                  className="iconify language-icon"
                  data-icon="twemoji-flag-for-united-states"
                  data-inline="false"
                  id={secondaryLanguageIconId}
                />
                <span className="lang-btn-long">en-US</span>
                <span className="lang-btn-short">EN</span>
              </button>
            </div>
          </div>

          <div className="sidebar-footer">
            <span className="sidebar-footer-line">
              <span className="kbd">⌘</span><span className="kbd">K</span> search
            </span>
            <span className="sidebar-footer-line muted">
              v2026.05 · build #1285824
            </span>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="editor-tabs">
          {tabs.map((tab, i) => (
            <a
              key={tab.path}
              href={tab.href}
              className={`editor-tab ${activeHref === tab.href ? 'active' : ''}`}
              data-ext={tab.ext}
              data-href={tab.href}
            >
              <span className="editor-tab-icon" aria-hidden>
                {tab.ext === 'md' && 'M'}
                {tab.ext === 'tsx' && 'TS'}
                {tab.ext === 'json' && '{}'}
                {tab.ext === 'log' && 'L'}
              </span>
              <span className="editor-tab-label">{tab.label}</span>
              <span className="editor-tab-close" aria-hidden>×</span>
            </a>
          ))}
          <span className="editor-tabs-spacer" />
          <span className="editor-tabs-meta">
            <span className="editor-tabs-meta-key">workspace</span>
            <span className="editor-tabs-meta-val">portfolio</span>
          </span>
        </div>

        <section className="hero-card">
          <Header sharedData={sharedData.basic_info} />
        </section>

        <div className="stats-strip">
          <div className="stat">
            <span className="stat-num">{new Date().getFullYear() - 2018}<span className="stat-plus">+</span></span>
            <span className="stat-label">{languageTag === 'pt' ? 'Anos codando' : 'Years coding'}</span>
          </div>
          <div className="stat">
            <span className="stat-num">{sharedData.skills?.icons?.length || '—'}</span>
            <span className="stat-label">Stack</span>
          </div>
          <div className="stat">
            <span className="stat-num">{resumeData.projects?.length || '—'}</span>
            <span className="stat-label">{languageTag === 'pt' ? 'Projetos' : 'Projects'}</span>
          </div>
          <div className="stat">
            <span className="stat-num">{resumeData.experience?.length || '—'}</span>
            <span className="stat-label">{languageTag === 'pt' ? 'Empresas' : 'Companies'}</span>
          </div>
          <div className="stat stat-status">
            <span className="stat-pulse" />
            <span className="stat-label">{languageTag === 'pt' ? 'Online · Brasil' : 'Online · Brazil'}</span>
          </div>
        </div>

        <div className="bento">
          <div className="bento-cell bento-about">
            <About
              resumeBasicInfo={resumeData.basic_info}
              sharedBasicInfo={sharedData.basic_info}
            />
          </div>

          <div className="bento-cell bento-projects">
            <Projects
              resumeProjects={resumeData.projects}
              resumeBasicInfo={resumeData.basic_info}
            />
          </div>

          <div className="bento-cell bento-skills">
            <Skills
              sharedSkills={sharedData.skills}
              resumeBasicInfo={resumeData.basic_info}
            />
          </div>

          <div className="bento-cell bento-experience">
            <Experience
              resumeExperience={resumeData.experience}
              resumeBasicInfo={resumeData.basic_info}
            />
          </div>
        </div>

        <Footer sharedBasicInfo={sharedData.basic_info} />
      </main>

      <footer className="ide-statusbar" role="status">
        <div className="ide-statusbar-left">
          <span className="ide-statusbar-item ide-statusbar-branch">
            <span className="ide-statusbar-icon" aria-hidden></span>
            <span>main</span>
            <span className="ide-statusbar-sync" aria-hidden>↻</span>
          </span>
          <span className="ide-statusbar-item">
            <span className="ide-statusbar-icon ok" aria-hidden>✓</span>
            <span>0 errors</span>
          </span>
          <span className="ide-statusbar-item">
            <span className="ide-statusbar-icon warn" aria-hidden>⚠</span>
            <span>0 warnings</span>
          </span>
          <span className="ide-statusbar-item ide-statusbar-deploy">
            <span className="ide-statusbar-dot" aria-hidden></span>
            <span>deploy ready</span>
          </span>
        </div>
        <div className="ide-statusbar-right">
          <span className="ide-statusbar-item">Ln 1, Col 1</span>
          <span className="ide-statusbar-item">Spaces: 2</span>
          <span className="ide-statusbar-item">UTF-8</span>
          <span className="ide-statusbar-item">LF</span>
          <span className="ide-statusbar-item ide-statusbar-lang">TypeScript React</span>
        </div>
      </footer>
    </div>
  );
}
