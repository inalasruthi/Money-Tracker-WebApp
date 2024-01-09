const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneyTrackerDB', { useNewUrlParser: true, useUnifiedTopology: true });

const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    date: Date
});

const Expense = mongoose.model('Expense', expenseSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

// Save expense
app.post('/addExpense', (req, res) => {
    const newExpense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        date: new Date()
    });
    newExpense.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Expense added successfully!');
        }
    });
});

// Retrieve all expenses
app.get('/expenses', (req, res) => {
    Expense.find({}, (err, expenses) => {
        if (err) {
            res.send(err);
        } else {
            res.json(expenses);
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
