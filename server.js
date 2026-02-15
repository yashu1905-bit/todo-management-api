require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Todo } = require('./models');
const { protect, adminOnly } = require('./middleware');

const app = express();
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// --- AUTH APIs ---
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User created" });
    } catch (err) { res.status(400).json({ message: "User already exists" }); }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && !user.isDeleted && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role });
    } else {
        res.status(401).json({ message: "Invalid credentials or account deleted" });
    }
});

// --- USER APIs ---
app.get('/api/users/profile', protect, (req, res) => res.json(req.user));

app.delete('/api/users/me', protect, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { isDeleted: true });
    res.json({ message: "Account soft-deleted" });
});

// --- ADMIN APIs ---
app.get('/api/admin/users', protect, adminOnly, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// --- TODO APIs ---
app.post('/api/todos', protect, async (req, res) => {
    const todo = await Todo.create({ ...req.body, user: req.user._id });
    res.json(todo);
});

app.get('/api/todos', protect, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const todos = await Todo.find({ user: req.user._id }).skip((page - 1) * limit).limit(limit);
    res.json(todos);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));