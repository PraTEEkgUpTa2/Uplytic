import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";
import heroImage from "@/public/image.png";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Floating animation elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-secondary rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-success rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-4 h-4 bg-warning rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-online rounded-full pulse-ring" />
              Website monitoring made simple
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Keep your
              <span className="gradient-text block">websites alive</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Monitor uptime, performance, and user experience with real-time alerts 
              and detailed analytics. Never miss a downtime again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-hero group">
                Start monitoring
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="px-8 py-3 rounded-lg font-medium">
                View demo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-online" />
                99.9% uptime
              </div>
              <div>30-day free trial</div>
              <div>No credit card required</div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <Image 
                src={heroImage} 
                alt="Website monitoring dashboard illustration" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Overlay status indicators */}
              <div className="absolute top-6 right-6 bg-card/95  backdrop-blur border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-online rounded-full pulse-ring" />
                  <div>
                    <div className="text-sm font-medium">All systems operational</div>
                    <div className="text-xs text-muted-foreground">Last updated: now</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur border border-border rounded-lg p-4 shadow-lg">
                <div className="text-sm font-medium">Response time</div>
                <div className="text-2xl font-bold text-online">127ms</div>
                <div className="text-xs text-muted-foreground">99.9% uptime this month</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;