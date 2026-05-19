import React, { useEffect, useState } from "react";

interface FooterProps {
  sharedBasicInfo: any;
}

export default function Footer({ sharedBasicInfo }: FooterProps) {
  const [networks, setNetworks] = useState<any>(null);

  useEffect(() => {
    if (sharedBasicInfo) {
      setNetworks(
        sharedBasicInfo.social.map((network: any) => (
          <a
            key={network.name}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
            aria-label={network.name}
          >
            <i className={network.class}></i>
          </a>
        ))
      );
    }
  }, [sharedBasicInfo]);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-meta">
          <small className="copyright">
            © {new Date().getFullYear()} — {sharedBasicInfo ? sharedBasicInfo.name : "..."}
          </small>
          <small className="footer-hint">Built with React · Hosted on GitHub Pages</small>
        </div>
        <div className="footer-socials social-links">{networks}</div>
      </div>
    </footer>
  );
}
