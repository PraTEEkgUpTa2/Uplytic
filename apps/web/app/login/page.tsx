"use client"

import { useState } from "react";
import Link  from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Shield, Zap, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import axios from "@/lib/api"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard for demo
    try {
      const res = await axios.post('/login',{
        username: email,
        password: password
      })

      if(res.status === 200){
        toast.success("Logged in successfully");
        window.location.href = '/dashboard';
      }
    } catch (error) {
      return toast.error("Invalid credentials");
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex">
      {/* Left Side - Content */}
     <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
        <div className="max-w-lg">
          <div className="flex items-center gap-2 mb-8">
            <div className="relative">
              <Monitor className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-online rounded-full animate-pulse-ring" />
            </div>
           <span className="gradient-text text-2xl font-bold">Uplytic</span>

          </div>
          
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r bg-clip-text">
            Welcome back to the future of monitoring
          </h1>
          

          <div className="grid gap-6">
            <div className="flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm animate-fade-in-up">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">End-to-end encryption & SOC2 compliance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Sub-second response times globally</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground">Deep insights & custom dashboards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <div className="relative">
                <Monitor className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-online rounded-full animate-pulse-ring" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text ">
                Uplytic
              </span>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <Button type="submit" className="btn-hero w-full">
                Sign in
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;