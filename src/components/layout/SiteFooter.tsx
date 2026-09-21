import React from "react";
import { Link } from "react-router-dom";

export function SpaceXFooter({ onOpenContact }: { onOpenContact?: () => void }) {
  return (
    <footer className="spacex-footer" role="contentinfo">
      <div className="spacex-footer-inner">
        <span className="spacex-footer-copy">LUNE © 2026</span>
        <ul className="spacex-footer-links">
          <li>
            <Link to="/systems">PLATFORMS</Link>
          </li>
          <li>
            <Link to="/infrastructure">INFRASTRUCTURE</Link>
          </li>
          <li>
            <Link to="/missions">MISSIONS</Link>
          </li>
          <li>
            <Link to="/research">RESEARCH</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/about#careers">CAREERS</Link>
          </li>
          <li>
            <Link to="/about#privacy">PRIVACY POLICY</Link>
          </li>
          <li>
            {onOpenContact ? (
              <button type="button" onClick={onOpenContact}>
                CONTACT
              </button>
            ) : (
              <Link to="/contact">CONTACT</Link>
            )}
          </li>
        </ul>
      </div>
    </footer>
  );
}

export const SiteFooter = SpaceXFooter;
export const Footer = SpaceXFooter;
