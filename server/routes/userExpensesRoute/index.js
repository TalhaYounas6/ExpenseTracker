import express from "express"
import {expenseSchema} from "../../middlewares/expenseSchema.js"
import {validateInput} from "../../middlewares/schemaValidator.js"
import * as expensesController from "../../controllers/userExpenses/index.js"

const router = express.Router();

router.post("/add-expense",validateInput(expenseSchema),expensesController.addExpense);
router.get("/get-expenses",expensesController.getExpenses);
router.delete("/delete-expense/:id",expensesController.deleteExpense);

export default router;