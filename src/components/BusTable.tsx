import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Space, Button, InputRef, DatePicker } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import { FilterConfirmProps, Key } from "antd/es/table/interface";
import moment from "moment";
import { FC, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
const { RangePicker } = DatePicker;

export interface IBus {
  key: string;
  route_number: string;
  departure_date: string;
  departure_time: string;
  destination: string;
  departure_station: string;
  departure_platform: string;
  arrival_station: string;
  ticket_price: number;
  bus_model: string;
  travel_time: string;
}
type DataIndex = keyof IBus;

const BusTable: FC<{ data: IBus[] }> = ({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

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
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IBus> => ({
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

  const getColumnDateSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Space>
          <RangePicker
            // format={"DD-MM-YY"}
            style={{ marginRight: 8 }}
            onChange={(e) => {
              setSelectedKeys([e as unknown as Key]);
            }}
            value={selectedKeys[0] as any}
            allowClear={true}
          />
        </Space>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(String(selectedKeys[0]));
              setSearchedColumn(dataIndex);
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters as () => void, confirm, setSelectedKeys);
            }}
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
    onFilter: (value: any, record) => {
      if (value) {
        let i = 1;
        let startDate = new Date(value[0]).getTime();
        let endDate = new Date(value[1]).getTime();
        let currentDate = new Date(record[dataIndex]).getTime();
        console.log(startDate, endDate, record, "start");
        if (startDate < currentDate && currentDate < endDate) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? moment(text).format("DD/MM/YYYY") : ""}
        />
      ) : (
        <>{moment(text).format("DD/MM/YYYY")}</>
      ),
  });

  const columns: ColumnsType<IBus> = [
    {
      title: "Route Number",
      dataIndex: "route_number",
      key: "route_number",
      sorter: (a, b) => a.route_number.localeCompare(b.route_number),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("route_number"),
    },
    {
      title: "Departure Date",
      dataIndex: "departure_date",
      key: "departure_date",
      sorter: (a, b) => a.departure_date.localeCompare(b.departure_date),
      sortDirections: ["ascend", "descend"],
      ...getColumnDateSearchProps("departure_date"),
    },
    {
      title: "Departure Time",
      dataIndex: "departure_time",
      key: "departure_time",
      sorter: (a, b) => a.departure_time.localeCompare(b.departure_time),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("departure_time"),
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      sorter: (a, b) => a.destination.localeCompare(b.destination),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("destination"),
    },
    {
      title: "Departure Station",
      dataIndex: "departure_station",
      key: "departure_station",
      sorter: (a, b) => a.departure_station.localeCompare(b.departure_station),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("departure_station"),
    },
    {
      title: "Departure Platform",
      dataIndex: "departure_platform",
      key: "departure_platform",
      sorter: (a, b) =>
        a.departure_platform.localeCompare(b.departure_platform),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("departure_platform"),
    },
    {
      title: "Arrival Station",
      dataIndex: "arrival_station",
      key: "arrival_station",
      sorter: (a, b) => a.arrival_station.localeCompare(b.arrival_station),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("arrival_station"),
    },
    {
      title: "Ticket Price",
      dataIndex: "ticket_price",
      key: "ticket_price",
      sorter: (a, b) => a.ticket_price - b.ticket_price,
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("ticket_price"),
    },
    {
      title: "Bus Model",
      dataIndex: "bus_model",
      key: "bus_model",
      sorter: (a, b) => a.bus_model.localeCompare(b.bus_model),
      ...getColumnSearchProps("bus_model"),
    },
    {
      title: "Travel Time",
      dataIndex: "travel_time",
      key: "travel_time",
      sorter: (a, b) => a.bus_model.localeCompare(b.bus_model),
      ...getColumnSearchProps("travel_time"),
    },
  ];
  console.log("data", data);
  return (
    <div
      style={{
        width: "90vw",
        minHeight: "600px",
      }}
    >
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.route_number }))}
        pagination={{ pageSize: 10 }}
      />
      ;
    </div>
  );
};

export default BusTable;
