import { Payment } from "../types/payments";

const data: Payment[] = [
  { id: "1", date: "09-01-2024", description: "test", amount: 100 },
  { id: "2", date: "09-02-2024", description: "test", amount: 110 },
  { id: "3", date: "09-03-2024", description: "test", amount: 120 },
  { id: "4", date: "09-04-2024", description: "test", amount: 130 },
  { id: "5", date: "09-05-2024", description: "test", amount: 140 },
  { id: "6", date: "09-06-2024", description: "test", amount: 150 },
];

export const getPayments = async (): Promise<Payment[]> => {
  return new Promise((resolve /* reject */) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve(data);
  //     reject("api not working");
  //   }, 1000);
  // });
};
