"use client";
import { Button, Table } from "reactstrap";
import { Payment } from "../types/payments";
import { DateRangePicker, RangeKeyDict, Range } from "react-date-range";
import { useState, useEffect } from "react";
import { PaymentsRow } from "./payment-row";

const initialRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface Props {
  data: Payment[];
}

export const PaymentList = ({ data }: Props) => {
  const [range, setRange] = useState(initialRange);
  const [payments, setPayments] = useState([...data]);
  const [sortAmountDir, setSortAmountDir] = useState("ASC");
  const [sortDateDir, setSortDateDir] = useState("ASC");

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

  const handleSelect = (ranges: RangeKeyDict) => {
    setRange({ ...ranges.selection });
  };

  const sortByAmount = (payments: Payment[]) => {
    if (sortAmountDir === "ASC") {
      setPayments(
        payments.sort((a: Payment, b: Payment) => a.amount - b.amount)
      );
      setSortAmountDir("DESC");
    } else {
      setPayments(
        payments.sort((a: Payment, b: Payment) => b.amount - a.amount)
      );
      setSortAmountDir("ASC");
    }
  };

  const sortByDate = (payments: Payment[]) => {
    if (sortDateDir === "ASC") {
      setPayments(
        payments.sort(
          (a: Payment, b: Payment) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      );
      setSortDateDir("DESC");
    } else {
      setPayments(
        payments.sort(
          (a: Payment, b: Payment) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
      setSortDateDir("ASC");
    }
  };

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
            <th>
              <Button outline onClick={() => sortByDate(payments)}>
                Date
              </Button>
            </th>
            <th>Description</th>
            <th>
              <Button outline onClick={() => sortByAmount(payments)}>
                Amount
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <PaymentsRow key={payment.id} payment={payment} />
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
