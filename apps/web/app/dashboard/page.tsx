"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Globe, 
  Settings,
  Plus,
  BarChart3,
  Zap,
  Shield,
  Bell,
  
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import AddWebsiteModal from "../components/AddWebsiteModal";
import axios from "@/lib/api"

interface Website {
    id: string,
    url: string,
    status: 'Up' | 'Down' | 'Checking',
    responseTime: number,
    lastCheck: string
}

const Dashboard = () => {
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([
  
  ]);

  const getWebsites = async () => {
    const response = await axios.get('/websites')
    setWebsites(response.data.map((website: any) => ({
        id: website.id,
        url: website.url,
        status: website.checks[0] ? (website.checks[0].status === 'UP' ? 'UP' : 'DOWN') : 'Checking',
        responseTime: website.checks[0] ? website.checks[0].response_time_ms : 0,
        lastCheck: website.checks[0] ? new Date(website.checks[0].createdAt).toLocaleString() : 'N/A'

    })))
  }

  useEffect(() => {
    getWebsites();
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UP":
        return "bg-online text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "DOWN":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "UP":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "DOWN":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-primary/10 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Monitor className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-online rounded-full animate-pulse-ring" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
                  MonitorPro
                </h1>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[hsl(var(--card))] backdrop-blur-sm border-[hsl(var(--primary)/0.2)] animate-fade-in-up">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Websites
                </CardTitle>
                <Globe className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(var(--card))] backdrop-blur-sm border-[hsl(var(--success)/0.2)] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Uptime
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">99.4%</div>
              <p className="text-xs text-muted-foreground">+0.2% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(var(--card))] backdrop-blur-sm border-[hsl(var(--warning)/0.2)] animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Response Time
                </CardTitle>
                <Zap className="h-4 w-4 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">539ms</div>
              <p className="text-xs text-muted-foreground">-23ms from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(var(--card))] backdrop-blur-sm border-[hsl(var(--primary)/0.2)] animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Incidents Today
                </CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Websites List */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Websites</h2>
            <Button 
              className="btn-hero hover:bg-primary-hover"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Website
            </Button>
          </div>

          <div className="grid gap-4">
            {websites.length === 0 ? (
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Monitor className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No websites yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start monitoring your websites by adding your first one. Track uptime, performance, and get alerts when issues occur.
              </p>
              <Button 
                className="btn-hero hover:bg-primary-hover"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Website
              </Button>
            </CardContent>
          </Card>
        ) : (websites.map((website, index) => (
              <Card 
                key={website.id} 
                className="bg-[hsl(var(--card))] backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Monitor className="h-6 w-6 text-primary" />
                        {website.status === "Up" && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-online rounded-full animate-pulse-ring" />
                        )}
                      </div>
                      <div>
                        {/* <CardTitle className="text-lg">{website.name}</CardTitle> */}
                        <CardDescription>{website.url}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(website.status)}>
                      {getStatusIcon(website.status)}
                      <span className="ml-1 capitalize">{website.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Response Time</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{website.responseTime}</span>
                        <span className="text-sm text-muted-foreground">ms</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Last Check</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{website.lastCheck}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Link href={`/website/${website.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )))}
          </div>

          {/* Quick Actions */}
         
        </div>
      </div>

      {/* Add Website Modal */}
      <AddWebsiteModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
      />
    </div>
  );
};

export default Dashboard;