import React, { useEffect, useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

interface ProjectsProps {
  resumeProjects: any;
  resumeBasicInfo: any;
}

export default function Projects({ resumeProjects, resumeBasicInfo }: ProjectsProps) {
  const [sectionName, setSectionName] = useState('');
  const [projects, setProjects] = useState<any>(null);
  const [deps, setDeps] = useState({});
  const [detailsModalShowState, setDetailsModalShowState] = useState(false);

  useEffect(() => {
    setSectionName(resumeBasicInfo?.section_name.projects);
    if (resumeProjects?.[0] && !detailsModalShowState) {
      setDeps(resumeProjects[0]);
      setDetailsModalShowState(true);
    }
    setProjects(resumeProjects?.map((project: any, idx: number) => {
      const num = String(idx + 1).padStart(2, '0');
      return (
        <article
          className="project-card"
          key={project.title}
          onClick={() => detailsModalShow(project)}
        >
          <div className="project-thumb">
            <img src={project.images[0]} alt={project.title} />
            <span className="project-date mono">{project.startDate}</span>
            <span className="project-status">
              <span className="project-status-dot" />
              shipped
            </span>
          </div>
          <div className="project-meta">
            <span className="project-num mono">project_{num}</span>
            <h3 className="project-title">{project.title}</h3>
            <span className="project-arrow" aria-hidden>↗</span>
          </div>
        </article>
      );
    }));
  }, [resumeBasicInfo, resumeProjects]);

  function detailsModalShow(data: any) {
    setDeps(data);
    setDetailsModalShowState(true);
  }

  const detailsModalClose = () => {
    setDetailsModalShowState(false);
  }

  return (
    <section id="portfolio" className="card card-projects">
      <header className="card-head">
        <span className="card-file">
          <span className="card-file-icon">{'<>'}</span>
          <span className="card-file-name">projects.tsx</span>
        </span>
        <span className="card-num">02</span>
        <h1 className="card-title"><span>{sectionName}</span></h1>
        <span className="card-tag">TYPESCRIPT</span>
      </header>

      <div className="projects-grid">{projects}</div>

      <ProjectDetailsModal
        show={detailsModalShowState}
        onHide={detailsModalClose}
        data={deps}
      />
    </section>
  );
}
