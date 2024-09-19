"use client";
import { Button, Table, Spinner } from "reactstrap";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { PaymentsRow } from "./payment-row";
import { usePayments } from "../hooks/payments";

const lastMidnigth = new Date();
lastMidnigth.setHours(0, 0, 0, 0);

export const PaymentList = () => {
  const {
    payments,
    filteredData,
    setFilteredData,
    handleSortByAmount,
    handleSortByDate
  } = usePayments();

  const { data, isLoading } = payments;

  const handleSelect = (ranges: RangeKeyDict) => {
    setFilteredData({...filteredData, range: { ...ranges.selection }});
  };

  return (
    <div className="container">
      <DateRangePicker
        className="p-4"
        ranges={[filteredData.range]}
        onChange={handleSelect}
      />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <Button outline onClick={() => handleSortByDate(filteredData.payments)}>
                Date
              </Button>
            </th>
            <th>Description</th>
            <th>
              <Button outline onClick={() => handleSortByAmount(filteredData.payments)}>
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
            filteredData.payments.map((payment) => (
              <PaymentsRow key={payment.id} payment={payment} />
            ))}
        </tbody>
      </Table>
      <div className="container">
        <h4>Total Transactions: {data.length || 0}</h4>
        <h4>Total Selected: {filteredData.payments.length || 0}</h4>
      </div>
    </div>
  );
};
