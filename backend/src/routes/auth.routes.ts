// src/routes/auth.routes.ts
import { NextFunction, Router, Request, Response } from "express";
import { AuthController } from "../controller/auth.controllers";
import asyncHandler from "express-async-handler";

const router = Router();

function checker(req: Request, res: Response, next: NextFunction) {
    console.log("Request was made here");
    next();
}

router.post('/register', checker, asyncHandler(AuthController.register));
router.post('/login', asyncHandler(AuthController.login));

export default router;
