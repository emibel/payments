"use client";
import { Table } from "reactstrap";
import { Payment } from "../types/payments";
import { DateRangePicker, RangeKeyDict, Range } from "react-date-range";
import { useState, useEffect } from "react";

const initialRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export const PaymentList = ({ data }: { data: Payment[] }) => {
  const [range, setRange] = useState(initialRange);
  const [payments, setPayments] = useState([...data]);

  const handleSelect = (ranges: RangeKeyDict) => {
    setRange({ ...ranges.selection });
  };

  useEffect(() => {
    setPayments(
      [...data].filter(
        (p) =>
          range.startDate &&
          new Date(p.date) >= range.startDate &&
          range.endDate &&
          new Date(p.date) <= range.endDate
      )
    );
  }, [range, data]);

  return (
    <div className="container">
      <DateRangePicker
        className="p-4"
        ranges={[range]}
        onChange={handleSelect}
      />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((d) => (
            <tr key={d.id}>
              <th scope="row">{d.id}</th>
              <td>{d.date}</td>
              <td>{d.description}</td>
              <td>$ {d.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="container">
        <h4>Total Transactions: {data.length || 0}</h4>
        <h4>Total Selected: {payments.length || 0}</h4>
      </div>
    </div>
  );
};
