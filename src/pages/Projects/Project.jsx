import React from "react";
import Residentials from "./Residentials";
import Commercial from "./Commercial";

const Project = () => {
  return (
    <div className=" bg-[#444]">
      <section
        id="residential"
        className="scroll-mt-24 py-10 border-t border-gray-400 mobile-project-commerical"
      >
        <Residentials />
      </section>
      <section
        id="commercial"
        className="scroll-mt-24 py-16 border-t border-gray-400 mobile-project-commerical"
      >
        <Commercial />
      </section>
    </div>
  );
};

export default Project;
