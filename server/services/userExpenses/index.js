import { Expenses } from "../../models/expenses.model.js"

// Create new expense
export const createExpense = async (data) => {
    const expense = new Expenses(data);
    return await expense.save();
};

// Get all expenses
export const getAllExpenses = async () => {
    return await Expenses.find().sort({ createdAt: -1 });
};

// Delete expense
export const deleteExpense = async (id) => {
    return await Expenses.findByIdAndDelete(id);
};