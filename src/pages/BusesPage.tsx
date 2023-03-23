import { InboxOutlined } from "@ant-design/icons";
import { Modal, Space, Tabs, TabsProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { FC, useState } from "react";
import BusTable, { IBus } from "../components/BusTable";
import InlineBuses from "../components/InlineBuses";

const BussesPage: FC = () => {
  const [files, setFiles] = useState<IBus[]>([]);
  return (
    <Space direction="vertical">
      <Dragger
        showUploadList={true}
        maxCount={1}
        onRemove={(e) => setFiles([])}
        action={""}
        beforeUpload={(file) => {
          try {
            const reader = new FileReader();

            reader.onload = (e: any) => {
              try {
                // console.log(e.target.result, "result");
                const records = JSON.parse(e.target.result);
                console.log(records.buses);

                setFiles(records.buses);
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
              content: "Please make sure you uploaded correct buses json",
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
          <BusTable data={files} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inline" key="2">
          <InlineBuses data={files} />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
};

export default BussesPage;
