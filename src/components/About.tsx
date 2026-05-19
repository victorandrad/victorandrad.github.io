import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

interface AboutProps {
  sharedBasicInfo: any;
  resumeBasicInfo: any;
}

export default function About({ sharedBasicInfo, resumeBasicInfo }: AboutProps) {
  const [profilepic, setProfilepic] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [hello, setHello] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    if (sharedBasicInfo) {
      setProfilepic("images/" + sharedBasicInfo.image);
    }

    if (resumeBasicInfo) {
      setSectionName(resumeBasicInfo.section_name.about);
      setHello(resumeBasicInfo.description_header);
      setAbout(resumeBasicInfo.description);
    }
  }, [sharedBasicInfo, resumeBasicInfo]);

  return (
    <section id="about" data-testid="about-section" className="card card-about">
      <header className="card-head">
        <span className="card-file">
          <span className="card-file-icon">#</span>
          <span className="card-file-name">about.md</span>
        </span>
        <span className="card-num">01</span>
        <h1 className="card-title"><span>{sectionName}</span></h1>
        <span className="card-tag">MARKDOWN</span>
      </header>

      <div className="card-body about-body">
        <div className="about-avatar-wrap">
          <img
            className="about-avatar"
            height="250px"
            src={profilepic}
            alt="Avatar placeholder"
          />
          <div className="about-avatar-meta">
            <span className="mono">avatar.png</span>
            <span className="mono muted">240x240 · 6kb</span>
          </div>
        </div>

        <div className="about-text">
          <p className="about-hello">
            <span className="wave">{hello} :)</span>
          </p>
          <p className="about-description">{about}</p>

          <div className="about-stack">
            <span className="about-stack-label">$ stack --primary</span>
            <Icon icon="logos:angular" className="about-stack-icon" />
            <Icon icon="logos:react" className="about-stack-icon" />
            <Icon icon="logos:php" className="about-stack-icon" />
          </div>
        </div>
      </div>
    </section>
  );
}
