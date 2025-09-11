"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Users, Clock, Award, Zap, BarChart3, Shield } from "lucide-react";
import { toast } from "sonner";
import axios from "@/lib/api"
import { BACKEND_URL } from "@/lib/utils";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard for demo
    const data = new FormData();
    

    if(formData.password !== formData.confirmPassword){
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axios.post(`/signup`, {
        username: formData.email,
        password: formData.password
      })

      if(res.status === 200){
        window.location.href = '/login';
        toast.success("Account created successfully. Please log in.");
      }
    } catch (error) {
      console.log(error);
      return toast.error("Error creating account");
    }

    
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Start monitoring in minutes, not hours
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


      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <div className="relative">
                <Monitor className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-online rounded-full animate-pulse-ring" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
                Uplytic
              </span>
            </div>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>
              Start monitoring your websites in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* <div className="space-y-2"> */}
                {/* <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div> */}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              
              
              
              <Button className="btn-hero w-full" type="submit"
              >
  Create Account
</Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;