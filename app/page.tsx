"use client";

import React from "react";
import { PaymentList } from "./src/components/payment-list";
import { Alert } from "reactstrap";
import { usePayments } from "./src/hooks/payments";

export default function Home() {
  const { error } = usePayments();

  return (
    <div className="container">
      {error && <Alert color="danger">{error}</Alert>}
      { <PaymentList />}
    </div>
  );
}
