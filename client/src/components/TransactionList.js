import { Table, Card } from "react-bootstrap";

const TransactionList = ({ transactions }) => {
  return (
    <Card className="mt-5 shadow-sm border-0 rounded-4 mx-auto" style={{ maxWidth: "750px" }}>
      <Card.Body>
        <h5 className="mb-3 text-center">Transactions</h5>

        <Table hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={t._id}>
                <td>{i + 1}</td>
                <td className={t.type === "income" ? "text-success" : "text-danger"}>
                {t.type.charAt(0).toUpperCase() + t.type.slice(1).toLowerCase()}
                </td>
                <td>₹ {t.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TransactionList;
