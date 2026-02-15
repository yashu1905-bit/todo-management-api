const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = { User, Todo };