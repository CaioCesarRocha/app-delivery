import express from "express";
import cors from 'cors';
import "express-async-errors"; //pro express retornar os errors
import errorHandler from "./src/middlewares/errorHandler";
import { clientsRoutes } from "./src/routes/client.routes";
import { deliveryRoutes } from "./src/routes/delivery.routes";
import { authenticateRoutes } from "./src/routes/authenticate.routes";
import { deliverymanRoutes } from "./src/routes/deliveryman.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(clientsRoutes);
app.use(deliveryRoutes);
app.use(deliverymanRoutes);
app.use(authenticateRoutes);

app.use(errorHandler)

app.listen(3000, () => console.log('Server is Running at 3000'));