// Removendo imports dos ícones - usando strings diretas
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
    <section id="about">
      <div className="col-md-12">
        <h1 style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="row center mx-auto mb-5">
          <div className="col-md-4 mb-5 center">
            <div className="polaroid">
              <span style={{ cursor: "auto" }}>
                <img
                  height="250px"
                  src={profilepic}
                  alt="Avatar placeholder"
                />
                <Icon
                  icon="logos:angular"
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
                <Icon
                  icon="logos:react"
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
                <Icon
                  icon="logos:php"
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
              </span>
            </div>
          </div>

          <div className="col-md-8 center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <span
                    className="iconify"
                    data-icon="emojione:red-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                  }}
                >
                  <br />
                  <span className="wave">{hello} :) </span>
                  <br />
                  <br />
                  {about}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
