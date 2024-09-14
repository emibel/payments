import { Payment } from "../types/payments";

const data: Payment[] = [
  { id: "1", date: "09-11-2024", description: "test - 1", amount: 100 },
  { id: "2", date: "09-12-2024", description: "test - 2", amount: 110 },
  { id: "3", date: "09-13-2024", description: "test - 3", amount: 120 },
  { id: "4", date: "09-14-2024", description: "test - 4", amount: 130 },
  { id: "5", date: "09-15-2024", description: "test - 5", amount: 140 },
  { id: "6", date: "09-16-2024", description: "test - 6", amount: 150 },
];

export const getPayments = async (): Promise<Payment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject("Api not working");
  //   }, 1000);
  // });
};
