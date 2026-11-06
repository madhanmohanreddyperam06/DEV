import React from "react";

import LeetCodeAnalytics from "./LeetCodeAnalytics";
import ProjectHorizontal from "./ProjectHorizontal";

const ProjectSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#080808]">
      <LeetCodeAnalytics />
      <ProjectHorizontal />
    </section>
  );
};

export default ProjectSection;