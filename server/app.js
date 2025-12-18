import express from "express";
import cors from "cors";
import "dotenv/config";
import expenseRoutes from "./routes/userExpensesRoute/index.js"

// import routes from "./routes/index.js"
// import errorHandler from "./controllers/error/errorController.js"


const app = express();


app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("server is livee");
});


app.use(expenseRoutes);


// app.use(routes);

// app.all('*', (req, res, next) => {
//   const err = new Error(`Can't find ${req.originalUrl} on the server!`);
//   err.statusCode = 404;
//   next(err); 
// });

// app.use(errorHandler);

export default app;


