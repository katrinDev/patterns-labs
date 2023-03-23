import { FC } from "react";
import { IBus } from "./BusTable";

const InlineBuses: FC<{ data: IBus[] }> = ({ data }) => {
  return (
    <div
      style={{
        width: "90vw",
        minHeight: "600px"
      }}
    >
      {data.map((item) => (
        <div key={item.route_number}>
          {item.travel_time}, {item.bus_model}, {item.ticket_price},{" "}
          {item.arrival_station}, {item.departure_platform},{" "}
          {item.departure_station}, {item.destination}, {item.departure_time},{" "}
          {item.departure_date}, {item.route_number}
        </div>
      ))}
    </div>
  );
};

export default InlineBuses;
