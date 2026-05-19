import React, { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import { Modal } from "react-bootstrap";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import AwesomeSliderStyles from "../scss/light-slider.scss";

interface ProjectDetailsProps {
  data: any;
  onHide: any;
  show: any;
}

export default function ProjectDetailsModal(props: ProjectDetailsProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [tech, setTech] = useState<any>(null);
  const [img, setImg] = useState<any>(null);

  useEffect(() => {
    if (props.data) {
      const technologies = props.data.technologies;
      const images = props.data.images;

      setTitle(props.data.title || '');
      setDescription(props.data.description || '');
      setUrl(props.data.url || '');
      setStartDate(props.data.startDate || '');

      if (technologies) {
        setTech(technologies.map((icons: any, i: any) => (
          <li className="modal-tech-pill" key={i}>
            <i className={`${icons.class} modal-tech-icon`} aria-hidden></i>
            <span className="modal-tech-name">{icons.name}</span>
          </li>
        )));
      } else {
        setTech(null);
      }

      if (images) {
        setImg(images.map((elem: any, i: any) => (
          <div key={i} data-src={elem} />
        )));
      } else {
        setImg(null);
      }
    }
  }, [props]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-inside project-modal"
    >
      <header className="project-modal-head">
        <span className="card-file">
          <span className="card-file-icon">{'<>'}</span>
          <span className="card-file-name">project.tsx</span>
        </span>
        {startDate && (
          <span className="project-modal-date mono">{startDate}</span>
        )}
        <span className="project-modal-status">
          <span className="project-status-dot" />
          shipped
        </span>
        <button
          type="button"
          onClick={props.onHide}
          className="project-modal-close"
          aria-label="Close"
        >
          <i className="fas fa-times close-icon"></i>
        </button>
      </header>

      <div className="project-modal-scroll">
        <div className="project-modal-slider">
          <div className="slider-tab">
            <span className="slider-tab-dot dot-r" />
            <span className="slider-tab-dot dot-y" />
            <span className="slider-tab-dot dot-g" />
          </div>
          <AwesomeSlider
            cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
            animation="scaleOutAnimation"
            className="slider-image"
          >
            {img}
          </AwesomeSlider>
        </div>

        <div className="project-modal-body">
          <h3 className="project-modal-title">{title}</h3>
          <p className="modal-description">{description}</p>

          {tech && (
            <div className="project-modal-meta">
              <span className="project-modal-meta-label">$ stack</span>
              <ul className="modal-tech-list">{tech}</ul>
            </div>
          )}

          {url && (
            <div className="project-modal-actions">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal-cta"
              >
                <span>view live</span>
                <span aria-hidden>↗</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
