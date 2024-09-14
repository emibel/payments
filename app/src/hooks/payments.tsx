import { useState, useEffect } from "react";
import { Payment } from "../types/payments";
import { getPayments } from "../api/payments";

export const usePayments = () => {
  const [data, setData] = useState([] as Payment[]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const result: Payment[] = await getPayments();
        setData(result);
        setError("");
      } catch (error) {
        setData([]);
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return {
    error,
    data,
    isLoading,
  };
};
