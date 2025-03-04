import express from "express";
import multer from "multer";
import {
  createClient,
  getClient,
  updateClient,
  deleteClient,
} from "../controllers/client-controller";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("clientLogo"), createClient);
router.get("/:slug", getClient);
router.put("/:slug", upload.single("clientLogo"), updateClient);
router.delete("/:slug", deleteClient);

export default router;  
