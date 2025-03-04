import express from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client-routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
