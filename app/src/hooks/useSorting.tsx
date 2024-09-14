import { useState } from "react";
import { Payment } from "../types/payments";

export const useSorting = () => {
  const [sortDateDir, setSortDateDir] = useState("ASC");
  const [sortAmountDir, setSortAmountDir] = useState("ASC");

  const sortByDate = (list: Payment[]) => {
    if (sortDateDir === "ASC") {
      setSortDateDir("DESC");
      return [
        ...list.sort(
          (a: Payment, b: Payment) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      ];
    } else {
      setSortDateDir("ASC");
      return [
        ...list.sort(
          (a: Payment, b: Payment) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      ];
    }
  };

  const sortByAmount = (payments: Payment[]) => {
    if (sortAmountDir === "ASC") {
      setSortAmountDir("DESC");
      return payments.sort((a: Payment, b: Payment) => a.amount - b.amount);
    } else {
      setSortAmountDir("ASC");
      return payments.sort((a: Payment, b: Payment) => b.amount - a.amount);
    }
  };
  return {
    sortByDate,
    sortByAmount,
  };
};
