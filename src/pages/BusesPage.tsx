import { InboxOutlined } from "@ant-design/icons";
import { Modal, Space, Tabs, TabsProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { FC, useState } from "react";
import BusTable, { IBus } from "../components/BusTable";
import InlineBuses from "../components/InlineBuses";

class RecordsComposite {
  records: any[] = [];
  constructor() {
    this.records = [];
  }

  add(record: any) {
    this.records.push(record);
  }

  getBuses() {
    const buses = [];
    for (const record of this.records) {
      buses.push(...record.getBuses());
    }
    return buses;
  }
}

class Record {
  buses: IBus[] = [];
  constructor(buses: IBus[]) {
    this.buses = buses;
  }

  getBuses() {
    return this.buses;
  }
}

function parseRecords(json: any) {
  const records = new RecordsComposite();
  const dataSingleton = (function () {
    let instance: any;
    function createInstance() {
      const data = JSON.parse(json);
      return data;
    }
    return {
      getInstance: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      },
    };
  })();

  const data = dataSingleton.getInstance();
  if (data?.buses) {
    const record = new Record(data.buses);
    records.add(record);
  } else if (Array.isArray(data)) {
    for (const item of data) {
      if (item?.buses) {
        const record = new Record(item.buses);
        records.add(record);
      }
    }
  } else {
    throw new Error("Invalid data format");
  }
  return records;
}

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
                const records = parseRecords(e.target.result);
                const buses = records.getBuses();
                console.log(records, buses);
                setFiles(buses);
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
