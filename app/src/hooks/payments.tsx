import { useState, useEffect } from "react";
import { Payment } from "../types/payments";
import { getPayments } from "../api/payments";
import { filteredStore, paymentStore } from "../atoms/payments";
import { useAtom } from "jotai";
import { useSorting } from "./useSorting";

export const usePayments = () => {
  const [ payments, setPayments ] = useAtom(paymentStore)
  const [ filteredData, setFilteredData ] = useAtom(filteredStore)
  const { sortByDate, sortByAmount } = useSorting();

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

  useEffect(() => {
    setFilteredData(
      {...filteredData,
        payments: [...payments.data].filter(
        (p) =>
          filteredData.range.startDate &&
          new Date(p.date) >= filteredData.range.startDate &&
          filteredData.range.endDate &&
          new Date(p.date) <= filteredData.range.endDate
      )}
    );
  }, [filteredData.range, payments.data]);

  const handleSortByAmount = (payments: Payment[]) => {
    const sortedPayments = sortByAmount(payments);
    setFilteredData( {...filteredData, payments: sortedPayments});
  };

  const handleSortByDate = (payments: Payment[]) => {
    const sortedPayments = sortByDate(payments);
    setFilteredData({...filteredData, payments: sortedPayments});
  };


  return { payments, filteredData, setFilteredData, handleSortByAmount, handleSortByDate }
};
