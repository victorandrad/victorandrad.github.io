import React, { useEffect, useState } from "react";

interface SkillsProps {
  sharedSkills: any;
  resumeBasicInfo: any;
}

interface SkillItem {
  name: string;
  class: string;
  level: string;
}

const FRONTEND_KEYS = ['html', 'css', 'sass', 'bootstrap', 'angular', 'react', 'typescript', 'javascript'];
const BACKEND_KEYS = ['php', 'mysql', 'node', 'mongo', 'postgres', 'docker'];

function categorize(skill: SkillItem): 'frontend' | 'backend' {
  const cls = (skill.class || '').toLowerCase();
  if (BACKEND_KEYS.some(k => cls.includes(k))) return 'backend';
  if (FRONTEND_KEYS.some(k => cls.includes(k))) return 'frontend';
  return 'frontend';
}

export default function Skills({ sharedSkills, resumeBasicInfo }: SkillsProps) {
  const [sectionName, setSectionName] = useState('');
  const [grouped, setGrouped] = useState<Record<string, SkillItem[]>>({});

  useEffect(() => {
    if (sharedSkills && resumeBasicInfo) {
      setSectionName(resumeBasicInfo.section_name.skills);
      const groups: Record<string, SkillItem[]> = { frontend: [], backend: [] };
      (sharedSkills.icons as SkillItem[]).forEach(s => {
        groups[categorize(s)].push(s);
      });
      // Sort each group by level desc
      Object.keys(groups).forEach(k => {
        groups[k].sort((a, b) => parseInt(b.level || '0', 10) - parseInt(a.level || '0', 10));
      });
      setGrouped(groups);
    }
  }, [sharedSkills, resumeBasicInfo]);

  const renderGroup = (key: string, items: SkillItem[]) => {
    if (!items.length) return null;
    return (
      <div className="skill-group" key={key}>
        <div className="skill-group-head">
          <span className="skill-group-key">"{key}"</span>
          <span className="skill-group-punct">:</span>
          <span className="skill-group-bracket">[</span>
          <span className="skill-group-count">{items.length}</span>
        </div>
        <div className="skill-group-body">
          {items.map((skill, i) => {
            const level = parseInt(skill.level || '0', 10);
            return (
              <div className="skill-row" key={`${key}-${i}`} style={{ '--lvl': `${level}%` } as React.CSSProperties}>
                <i className={`${skill.class} skill-row-icon`} aria-hidden></i>
                <span className="skill-row-name">{skill.name}</span>
                <span className="skill-row-bar" aria-hidden>
                  <span className="skill-row-bar-fill" />
                </span>
                <span className="skill-row-level mono">{level}<span className="skill-row-level-unit">%</span></span>
              </div>
            );
          })}
        </div>
        <div className="skill-group-foot">
          <span className="skill-group-bracket">]</span>
        </div>
      </div>
    );
  };

  const totalCount = (grouped.frontend?.length || 0) + (grouped.backend?.length || 0);
  const avgLevel = totalCount > 0
    ? Math.round(
        ([...(grouped.frontend || []), ...(grouped.backend || [])]
          .reduce((acc, s) => acc + parseInt(s.level || '0', 10), 0)) / totalCount
      )
    : 0;

  return (
    <section id="skills" className="card card-skills">
      <header className="card-head">
        <span className="card-file">
          <span className="card-file-icon">{'{}'}</span>
          <span className="card-file-name">stack.json</span>
        </span>
        <span className="card-num">03</span>
        <h1 className="card-title"><span>{sectionName}</span></h1>
        <span className="card-tag">JSON</span>
      </header>

      <div className="skills-body">
        <div className="skills-json">
          <div className="skills-json-line skills-json-brace">{'{'}</div>
          {renderGroup('frontend', grouped.frontend || [])}
          {renderGroup('backend', grouped.backend || [])}
          <div className="skills-json-line skills-json-brace">{'}'}</div>
        </div>

        <div className="skills-summary">
          <div className="skills-summary-item">
            <span className="skills-summary-label">total</span>
            <span className="skills-summary-value">{totalCount}</span>
          </div>
          <div className="skills-summary-item">
            <span className="skills-summary-label">avg level</span>
            <span className="skills-summary-value">{avgLevel}%</span>
          </div>
          <div className="skills-summary-item">
            <span className="skills-summary-label">status</span>
            <span className="skills-summary-value skills-summary-ok">● healthy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
