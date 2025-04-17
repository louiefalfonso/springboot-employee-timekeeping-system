import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MainLogo from '@/assets/logo.png';

import { toast } from "sonner";

import { useState } from "react";
import axios from "axios";

const LoginFormComponent = () => {
    
    const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          if (!email || !password) {
            setError("Please enter both email and password.");
            return;
          }
          const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password,
          });
          const { token } = response.data;
          localStorage.setItem("token", token);
          toast.success("Login Successful!");
          window.location.href = "/dashboard";
        } catch (error) {
          setError("Invalid email or password.");
        }
      };

  return (
    <div className="flex flex-col gap-6">
        <Card>
        <CardHeader className="flex flex-col items-center" >
           <img src={MainLogo} alt="Logo" className="main-logo" />
          <CardTitle className="text-2xl text-center">Account Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  className="form-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                type="password"
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
              </div>
              <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginFormComponent