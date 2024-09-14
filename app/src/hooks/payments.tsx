import { useState, useEffect } from "react";
import { Payment } from "../types/payments";
import { getPayments } from "../api/payments";

export const usePayments = () => {
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

  return {
    error,
    data,
  };
};
