import { useState } from "react";
import { Payment } from "../types/payments";

export const useSorting = () => {
  const [sortDateDir, setSortDateDir] = useState("DESC");
  const [sortAmountDir, setSortAmountDir] = useState("DESC");

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

  const sortByAmount = (list: Payment[]) => {
    if (sortAmountDir === "ASC") {
      setSortAmountDir("DESC");
      return [...list.sort((a: Payment, b: Payment) => a.amount - b.amount)];
    } else {
      setSortAmountDir("ASC");
      return [...list.sort((a: Payment, b: Payment) => b.amount - a.amount)];
    }
  };

  return {
    sortByDate,
    sortByAmount,
  };
};
