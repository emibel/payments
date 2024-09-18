import { useState, useEffect } from "react";
import { Payment } from "../types/payments";
import { getPayments } from "../api/payments";
import { paymentStore } from "../atoms/payments";
import { useAtom } from "jotai";

export const usePayments = () => {
  const [ payments, setPayments ] = useAtom(paymentStore)

  useEffect(() => {
    const getData = async () => {
      try {
        setPayments({...payments, isLoading: true});
        const result: Payment[] = await getPayments();
        setPayments({
          data: [...result],
          error: '',
          isLoading: false,
        })
      } catch (error) {
        setPayments({
          data: [],
          error: error as string,
          isLoading: false,
        })
      }
    };
    getData();
  }, []);

  return payments
};
