import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.services';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { ZodError } from 'zod';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Validate request body using Zod schema
      const data = registerSchema.parse(req.body);

      // Call AuthService to handle registration logic
      const result = await AuthService.register(data);

      // Set refresh token as HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Send success response
      res.status(201).json({
        status: 'success',
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        });
      } else {
        // Pass other errors to the error-handling middleware
        next(error);
      }
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Validate request body using Zod schema
      const data = loginSchema.parse(req.body);

      // Call AuthService to handle login logic
      const result = await AuthService.login(data);

      // Set refresh token as HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Send success response
      res.status(200).json({
        status: 'success',
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        });
      } else {
        // Pass other errors to the error-handling middleware
        next(error);
      }
    }
  }
}
