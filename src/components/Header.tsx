import React, { useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import TypedText from "./TypedText";
import { Icon } from '@iconify/react';

interface HeaderProps {
  sharedData: any;
  checked?: any;
}

export default function Header({ sharedData }: HeaderProps) {
  const [name, setName] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (sharedData) {
      setName(sharedData.name);
      setTitles(sharedData.titles.map((x: string) => x.toUpperCase()));
    }
  }, [sharedData]);

  function onThemeSwitchChange(checked: any) {
    setChecked(checked)
    setTheme();
  }

  function setTheme() {
    let dataThemeAttribute = "data-theme";
    let body = document.body;
    let newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  const HeaderTitleTypeAnimation = React.memo(() => {
    return <TypedText 
      strings={titles}
      style={{ marginTop: 0, marginBottom: 11 }}
      className="title-styles"
      loop={true}
      typeSpeed={70}
      backSpeed={50}
      backDelay={1500}
    />;
  }, (props, prevProp) => true);

  return (
    <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>
      <div className="row aligner" style={{ height: '100%' }}>
        <div className="col-md-12">
          <div>
            <Icon icon="la:laptop-code" className="header-icon" />
            <br />
            <h1 className="mb-0">
              <TypedText strings={[name]} loop={false} typeSpeed={100} />
            </h1>
            <div className="title-container">
              <HeaderTitleTypeAnimation />
            </div>
            <ReactSwitch
              checked={checked}
              onChange={onThemeSwitchChange}
              offColor="#baaa80"
              onColor="#353535"
              className="react-switch mx-auto"
              width={90}
              height={40}
              uncheckedIcon={
                <Icon
                  icon="twemoji:owl"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "20px",
                    color: "#353239",
                  }}
                />
              }
              checkedIcon={
                <Icon
                  icon="noto:sun-with-face"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "10px",
                    color: "#353239",
                  }}
                />
              }
              id="icon-switch"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
