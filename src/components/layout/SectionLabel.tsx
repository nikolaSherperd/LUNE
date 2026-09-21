import React from "react";

export interface SectionLabelProps {
  number: string;
  label: string;
  detail?: string;
}

export function SectionLabel({
  number,
  label,
  detail,
}: SectionLabelProps) {
  return (
    <div className="section-label" data-reveal>
      <div className="label-top">
        <span>/{number}</span>
        <span>{label}</span>
      </div>
      <span className="label-rule" />
      {detail && <span className="label-detail">{detail}</span>}
    </div>
  );
}
