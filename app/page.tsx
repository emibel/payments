"use client";

import React, { useEffect, useState } from "react";
import { PaymentList } from "./src/components/payment-list";
import { Payment } from "./src/types/payments";
import { getPayments } from "./src/api/payments";
import { Alert } from "reactstrap";

export default function Home() {
  const [data, setData] = useState([] as Payment[]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const result: Payment[] = await getPayments();
        setData(result);
        setError("");
      } catch (error) {
        setData([]);
        setError(error as string);
      }
    };
    getData();
  });

  return (
    <div className="container">
      {error && <Alert color="danger">{error}</Alert>}
      {<PaymentList data={[...data]} />}
    </div>
  );
}
