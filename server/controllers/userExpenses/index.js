import {STATUS_CODES,TEXTS} from "../../config/constants.js"
import * as expenseServices from "../../services/userExpenses/index.js"

export const addExpense = async (req, res) => {
    try {

        const expense = await expenseServices.createExpense(req.body);

        res.status(STATUS_CODES.CREATED).json({
            success : true,
            message : TEXTS.CREATED,
            data : expense
        })
    
    } catch (error) {
        console.log("Error in adding: ",error);

        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : TEXTS.SERVER_ERROR,
            data : []
        })
    }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await expenseServices.getAllExpenses();
        res.status(STATUS_CODES.SUCCESS).json({
            success : true,
            message : TEXTS.DATA_FOUND,
            data : expenses
        })
    } catch (error) {
        console.log("Error in fetching: ",error);
        res.status(STATUS_CODES.NOT_FOUND).json({
            success : false,
            message : TEXTS.NOT_FOUND,
            data : []
        })
    }
};


export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await expenseServices.deleteExpense(id);
        
        if (!deleted) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
            success : false,
            message : TEXTS.NOT_FOUND,
            data : []
        })
        }

        return res.status(STATUS_CODES.SUCCESS).json({
            success : true,
            message : "Expense deleted",
            data : deleted
        })
        
    } catch (error) {
        console.log("Error in deletion: ",error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : TEXTS.SERVER_ERROR,
            data : []
        })
    }
}