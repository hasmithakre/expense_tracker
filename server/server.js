const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------- DATABASE --------------------
mongoose.connect("mongodb://127.0.0.1:27017/expense_tracker")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// -------------------- MODELS --------------------
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  type: { type: String, enum: ["income", "expense"] },
  amount: Number,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);

// -------------------- MIDDLEWARE --------------------
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "SECRET123");
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// -------------------- AUTH ROUTES --------------------

// Register (optional but recommended)
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });

  res.json({ message: "User Registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "SECRET123");
  res.json({ token });
});

// -------------------- TRANSACTIONS --------------------

// Add income or expense
app.post("/transaction", auth, async (req, res) => {
  const { type, amount } = req.body;

  await Transaction.create({
    userId: req.userId,
    type,
    amount
  });

  res.json({ message: "Transaction Added" });
});

// Get all transactions
app.get("/transactions", auth, async (req, res) => {
  const data = await Transaction.find({ userId: req.userId });
  res.json(data);
});

// -------------------- SERVER --------------------
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
