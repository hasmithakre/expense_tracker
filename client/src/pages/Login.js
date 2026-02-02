import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Card className="shadow-sm p-4" style={{ width: "380px", borderRadius: "12px" }}>
        <h4 className="text-center mb-4 text-primary">Expense Tracker</h4>

        <Form.Control
          className="mb-3"
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <Form.Control
          className="mb-4"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <Button className="w-100" onClick={login}>
          Login
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
