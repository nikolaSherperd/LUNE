import React from "react";
import ProjectsPage, { ProjectsPageProps } from "./ProjectsPage";

export type MissionsPageProps = ProjectsPageProps;

export default function MissionsPage(props: ProjectsPageProps) {
  return <ProjectsPage {...props} />;
}
