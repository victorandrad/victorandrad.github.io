import React, { useEffect, useState } from "react";

interface ExperienceProps {
  resumeBasicInfo: any;
  resumeExperience: any;
}

export default function Experience({ resumeBasicInfo, resumeExperience }: ExperienceProps) {
  const [sectionName, setSectionName] = useState('');
  const [items, setItems] = useState<any>(null);

  useEffect(() => {
    if (resumeExperience && resumeBasicInfo) {
      setSectionName(resumeBasicInfo.section_name.experience);

      setItems(resumeExperience.map((work: any, i: number) => {
        const technologies = work.technologies || [];
        const mainTechnologies = work.mainTech || [];
        const isCurrent = i === 0;

        const mainTech = mainTechnologies.map((tech: string, j: number) => (
          <span className="exp-main-badge" key={`m-${j}`}>{tech}</span>
        ));

        const tech = technologies.map((technology: string, j: number) => (
          <span className="exp-badge" key={`t-${j}`}>{technology}</span>
        ));

        return (
          <article className="exp-item" key={i}>
            <div className="exp-when">
              <span className="exp-when-marker" aria-hidden>
                {isCurrent ? '●' : '○'}
              </span>
              <span className="exp-when-text">{work.years}</span>
              {isCurrent && <span className="exp-now">NOW</span>}
            </div>
            <div className="exp-body">
              <div className="exp-main-tags">{mainTech}</div>
              <h3 className="exp-title">{work.title}</h3>
              <h4 className="exp-company">
                <span className="exp-company-prompt">@</span>
                {work.company}
              </h4>
              <div className="exp-tags">{tech}</div>
            </div>
          </article>
        );
      }));
    }
  }, [resumeBasicInfo, resumeExperience]);

  return (
    <section id="resume" className="card card-experience">
      <header className="card-head">
        <span className="card-file">
          <span className="card-file-icon">$</span>
          <span className="card-file-name">experience.log</span>
        </span>
        <span className="card-num">04</span>
        <h1 className="card-title"><span>{sectionName}</span></h1>
        <span className="card-tag">LOG</span>
      </header>

      <div className="exp-list">{items}</div>
    </section>
  );
}
