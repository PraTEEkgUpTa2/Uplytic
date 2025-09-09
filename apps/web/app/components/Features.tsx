import { Shield, Zap, BarChart3, Bell, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Uptime Monitoring",
    description: "Get instant alerts when your website goes down. Monitor from multiple locations worldwide.",
  },
  {
    icon: Zap,
    title: "Performance Tracking",
    description: "Track page load times, response times, and core web vitals to optimize user experience.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Comprehensive reports and insights to understand your website's performance trends.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Customizable notifications via email, SMS, and integrations with Slack, Discord, and more.",
  },
  {
    icon: Globe,
    title: "Global Monitoring",
    description: "Monitor from 50+ locations worldwide to ensure consistent performance for all users.",
  },
  {
    icon: Lock,
    title: "SSL & Security",
    description: "Monitor SSL certificates, security headers, and get alerts before certificates expire.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to monitor
            <span className="gradient-text"> your websites</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive monitoring tools designed to keep your websites running smoothly 
            and your users happy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="monitoring-card group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;