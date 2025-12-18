import JOI from "joi"

export const expenseSchema = JOI.object({
    title: JOI.string().min(3).max(50).required().label('Title'),
    amount: JOI.number().positive().required().label('Amount'),
    category: JOI.string().required().label('Category'),
    description: JOI.string().max(100).optional().label('Description'),
    date: JOI.date().required().label('Date'),
})