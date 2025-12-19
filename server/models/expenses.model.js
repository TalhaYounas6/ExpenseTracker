import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        maxLength: 100,
        trim: true
    },
},{timestamps : true})

export const Expenses = mongoose.model("Expenses",expensesSchema)