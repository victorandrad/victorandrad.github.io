import React, { useEffect, useState } from "react";

interface FooterProps {
  sharedBasicInfo: any;
}

export default function Footer({ sharedBasicInfo }: FooterProps) {
  const [networks, setNetworks] = useState('');

  useEffect(() => {
    if (sharedBasicInfo) {
      setNetworks(
        sharedBasicInfo.social.map((network: any) => {
          return (
            <span key={network.name} className="m-4">
              <a href={network.url} target="_blank" rel="noopener noreferrer">
                <i className={network.class}></i>
              </a>
            </span>
          );
        })
      );
    }
  }, [sharedBasicInfo]);

  return (
    <footer>
      <div className="col-md-12">
        <div className="social-links">{networks}</div>

        <div className="copyright py-4 text-center">
          <div className="container">
            <small>
              Copyright &copy;{new Date().getFullYear()} - {sharedBasicInfo ? sharedBasicInfo.name : "???"}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
