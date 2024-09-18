"use client";
import { Button, Table, Spinner } from "reactstrap";
import { Payment } from "../types/payments";
import { DateRangePicker, RangeKeyDict, Range } from "react-date-range";
import { useState, useEffect } from "react";
import { PaymentsRow } from "./payment-row";
import { usePayments } from "../hooks/payments";
import { useSorting } from "../hooks/useSorting";

const lastMidnigth = new Date();
lastMidnigth.setHours(0, 0, 0, 0);

const initialRange: Range = {
  startDate: lastMidnigth,
  endDate: lastMidnigth,
  key: "selection",
};

export const PaymentList = () => {
  const { data, isLoading } = usePayments();
  const [ range, setRange ] = useState(initialRange);
  const [ payments, setPayments ] = useState([...data]);
  const { sortByDate, sortByAmount } = useSorting();

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

  const handleSortByAmount = (payments: Payment[]) => {
    const sortedPayments = sortByAmount(payments);
    setPayments(sortedPayments);
  };

  const handleSortByDate = (payments: Payment[]) => {
    const sortedPayments = sortByDate(payments);
    setPayments(sortedPayments);
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
              <Button outline onClick={() => handleSortByDate(payments)}>
                Date
              </Button>
            </th>
            <th>Description</th>
            <th>
              <Button outline onClick={() => handleSortByAmount(payments)}>
                Amount
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <Spinner color="primary" type="grow">
              Loading...
            </Spinner>
          )}
          {!isLoading &&
            payments.map((payment) => (
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
