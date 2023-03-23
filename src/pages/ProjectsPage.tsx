import { InboxOutlined } from "@ant-design/icons";
import { Modal, Space, Tabs } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { FC, useState } from "react";
import InlineProjects from "../components/InlineProjects";
import { IProject, ProjectsTable } from "../components/ProjectsTable";

const ProjectsPage: FC = () => {
  const [files, setFiles] = useState<IProject[]>([]);
  return (
    <Space direction="vertical">
      <Dragger
        showUploadList={true}
        maxCount={1}
        onRemove={() => setFiles([])}
        action={""}
        beforeUpload={(file) => {
          try {
            const reader = new FileReader();

            reader.onload = (e: any) => {
              try {
                // console.log(e.target.result, "result");
                const records = JSON.parse(e.target.result);
                console.log(records.projects);
                if (records?.projects) {
                  setFiles(records.projects);
                } else {
                  throw "";
                }
              } catch (error) {
                Modal.error({
                  title: `Failed to parse file`,
                  content: "Please make sure you uploaded correct csv report",
                });
              }
            };
            reader.readAsText(file);

            // Prevent upload
            return false;
          } catch (error) {
            Modal.error({
              title: `Failed to parse file`,
              content: "Please make sure you uploaded correct projects json",
            });

            return false;
          }
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Table" key="1">
          <ProjectsTable data={files} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inline" key="2">
          <InlineProjects data={files} />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
};

export default ProjectsPage;
