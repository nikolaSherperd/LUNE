import React from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "../../data";
import { SocialIcon } from "../SocialIcon";

export function SpaceXFooter({ onOpenContact }: { onOpenContact?: () => void }) {
  return (
    <footer className="spacex-footer" role="contentinfo">
      <div className="spacex-footer-inner">
        <ul className="spacex-footer-links">
          <li>
            <Link to="/platforms">PLATFORMS</Link>
          </li>
          <li>
            <Link to="/missions">MISSIONS</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/about#team">CAREERS</Link>
          </li>
          <li>
            <Link to="/about#privacy">PRIVACY</Link>
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

        <span className="spacex-footer-copy">LUNE AEROSPACE 2026</span>

        <ul className="spacex-footer-socials" aria-label="LUNE Aerospace social platforms">
          {socialLinks.map((social) => (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LUNE Aerospace on ${social.name}`}
                className="spacex-footer-social-link"
              >
                <SocialIcon id={social.id} size={15} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export const SiteFooter = SpaceXFooter;
export const Footer = SpaceXFooter;

