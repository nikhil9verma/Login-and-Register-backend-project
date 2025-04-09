import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

// Zod schema for validation
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setError("");

      console.log("Submitting:", data);
      const response = await api.post("/auth/login", data);
      console.log("API Response:", response.data);

      // Verify token exists
      if (!response.data.data.accessToken) {
        throw new Error("No access token in response");
      }

      // Store token in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("Token stored, redirecting...");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="w-72 max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl"><b> Welcome back !</b></CardTitle>
          
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              
              <Input
                id="email"
                type="email"
                placeholder="UID"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              {/* <Label htmlFor="password">Password</Label> */}
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

           
            <Button className="w-full bg-blue-950" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Error Message */}
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
