import { Card, Col, Row } from "react-bootstrap";

const Cards = ({ income, expense, total }) => {
  return (
    <Row className="mb-4 px-3">
      <Col md={4}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <small className="text-muted">Income</small>
            <h4 className="text-success mt-2">₹ {income}</h4>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <small className="text-muted">Expense</small>
            <h4 className="text-danger mt-2">₹ {expense}</h4>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <small className="text-muted">Total Balance</small>
            <h4 className="text-primary mt-2">₹ {total}</h4>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Cards;
