import { FileExcelOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space } from "antd";
import { ExportTableButton, Table } from "ant-table-extensions";
import {
  ColumnsType,
  ColumnType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { FC, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

export interface IProject {
  key: string;
  projectName: string;
  projectId: string;
  plannedEffort: number;
  resource: string;
  actualEffort: number;
  remainingEffort: number;
}
type DataIndex = keyof IProject;

export const ProjectsTable: FC<{ data: IProject[] }> = ({ data }) => {
  // Define a list of observers
  const searchObservers: any = [];

  // Define the observable object (subject)
  const searchSubject = {
    // Method to register an observer
    addObserver: function (observer: any) {
      searchObservers.push(observer);
    },
    // Method to remove an observer
    removeObserver: function (observer: any) {
      const index = searchObservers.indexOf(observer);
      if (index > -1) {
        searchObservers.splice(index, 1);
      }
    },
    // Method to notify all observers of a search event
    notifyObservers: function (selectedKeys: any, dataIndex: any) {
      searchObservers.forEach(function (observer: any) {
        observer.update(selectedKeys, dataIndex);
      });
    },
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [currentData, setCurrentData] = useState<any>([]);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    searchSubject.notifyObservers(selectedKeys, dataIndex);
  };
  class SearchObserver {
    update(selectedKeys: any, dataIndex: any) {
      console.log("Observer notified");
    }
  }

  const a = {}

  // Example usage:
  const observer1 = new SearchObserver();
  const observer2 = new SearchObserver();

  // Register the observers with the observable object
  searchSubject.addObserver(observer1);
  searchSubject.addObserver(observer2);
  const handleReset = (
    clearFilters: () => void,
    confirm: { (param?: FilterConfirmProps | undefined): void; (): void },
    setSelectedKeys: (i: any) => void
  ) => {
    clearFilters();
    setSearchText("");
    setSelectedKeys([]);
    confirm();
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IProject> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              handleReset(clearFilters as () => void, confirm, setSelectedKeys)
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IProject> = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("projectName"),
    },
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
      sorter: (a, b) => a.projectId.localeCompare(b.projectId),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("projectId"),
    },
    {
      title: "Planned Effort",
      dataIndex: "plannedEffort",
      key: "plannedEffort",
      sorter: (a, b) => a.plannedEffort - b.plannedEffort,
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("plannedEffort"),
    },
    {
      title: "Resource",
      dataIndex: "resource",
      key: "resource",
      sorter: (a, b) => a.resource.localeCompare(b.resource),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("resource"),
    },
    {
      title: "Actual Effort",
      dataIndex: "actualEffort",
      key: "actualEffort",
      sorter: (a, b) => a.actualEffort - b.actualEffort,
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("actualEffort"),
    },
    {
      title: "Remaining Effort",
      dataIndex: "remainingEffort",
      key: "remainingEffort",
      sorter: (a, b) => a.remainingEffort - b.remainingEffort,
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("remainingEffort"),
    },
  ];

  return (
    <>
      <ExportTableButton
        dataSource={currentData.length ? currentData : data}
        columns={columns}
        btnProps={{ type: "primary", icon: <FileExcelOutlined /> }}
        showColumnPicker
      >
        Export to CSV
      </ExportTableButton>
      <Table
        onChange={(a, b, c, d) => setCurrentData(d.currentDataSource)}
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.projectId }))}
      />
    </>
  );
};
