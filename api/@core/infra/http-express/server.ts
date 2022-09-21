import express from "express";
import cors from 'cors';
import { clientsRoutes } from "./routes/client.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use(clientsRoutes);

app.listen(3000, () => console.log('Server is Running at 3000'));