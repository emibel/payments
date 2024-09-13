import { Payment } from "../types/payments";

export const PaymentsRow = ({ payment }: { payment: Payment }) => (
  <tr>
    <th scope="row">{payment.id}</th>
    <td>{payment.date}</td>
    <td>{payment.description}</td>
    <td>$ {payment.amount}</td>
  </tr>
);
