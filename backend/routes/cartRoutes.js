import express from "express";
import { AddToCart, GetUserCart, UpdateCart } from "../controllers/cartController.js";
import {isAuth} from "../middleware/isAuth.js";
const cartRoutes = express.Router();

cartRoutes.post("/get", isAuth, GetUserCart);
cartRoutes.post("/add", isAuth, AddToCart);
cartRoutes.post("/update", isAuth, UpdateCart);

export default cartRoutes;