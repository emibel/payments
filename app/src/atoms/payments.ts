import { atom } from "jotai";
import { Payment } from "../types/payments";
import { Range } from "react-date-range";

type PaymentAtom = {
    data: Payment[]
    error: string
    isLoading: boolean
}

const paymentsAtom: PaymentAtom = {
    data: [],
    error: '',
    isLoading: false,
};

export const paymentStore = atom(paymentsAtom);



type FilteredPaymentsAtom = {
    payments: Payment[],
    range: Range
}


// const lastMidnigth = new Date();
// lastMidnigth.setHours(0, 0, 0, 0);

// const initialRange: Range = {
//   startDate: lastMidnigth,
//   endDate: lastMidnigth,
//   key: "selection",
// };

// const filteredPayments: FilteredPaymentsAtom = {
//     payments: [],
//     range: initialRange,
// }
