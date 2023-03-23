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
  };
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
