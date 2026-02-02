import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../components/Card";
import TransactionList from "../components/TransactionList";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get("http://localhost:5000/transactions", {
        headers: { Authorization: token }
      });
      setTransactions(res.data);
    };
    fetchTransactions();
  }, [token]);

  const addTransaction = async (type) => {
    if (!amount) return;

    await axios.post(
      "http://localhost:5000/transaction",
      { type, amount: Number(amount) },
      { headers: { Authorization: token } }
    );

    setAmount("");
    const res = await axios.get("http://localhost:5000/transactions", {
      headers: { Authorization: token }
    });
    setTransactions(res.data);
  };

  let income = 0, expense = 0;
  transactions.forEach(t =>
    t.type === "income" ? income += t.amount : expense += t.amount
  );

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      <h3 className="text-center mb-4">Dashboard</h3>

      <Card income={income} expense={expense} total={income - expense} />

      <Row className="justify-content-center mt-4">
        <Col md={4}>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            className="mb-3"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <div className="d-flex gap-3">
            <Button
              variant="success"
              className="w-100"
              onClick={() => addTransaction("income")}
            >
              Add Income
            </Button>

            <Button
              variant="danger"
              className="w-100"
              onClick={() => addTransaction("expense")}
            >
              Add Expense
            </Button>
          </div>
        </Col>
      </Row>

      <TransactionList transactions={transactions} />
    </Container>
  );
};

export default Dashboard;
