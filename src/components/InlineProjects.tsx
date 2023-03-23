import { FC } from "react";
import { IProject } from "./ProjectsTable";

const InlineProjects: FC<{ data: IProject[] }> = ({ data }) => {
  return (
    <div
      style={{
        width: "50vw",
        minHeight: "600px",
      }}
    >
      {data.map((item) => (
        <div key={item.projectName}>
          {item.projectId}, {item.plannedEffort}, {item.resource},{" "}
          {item.actualEffort}, {item.remainingEffort}{" "}
        </div>
      ))}
    </div>
  );
};

export default InlineProjects;
