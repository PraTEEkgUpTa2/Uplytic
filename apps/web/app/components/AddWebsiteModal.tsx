import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Globe, Clock, Bell } from "lucide-react";
import axios from "@/lib/api"
import { toast } from "sonner";

interface AddWebsiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddWebsiteModal = ({ open, onOpenChange }: AddWebsiteModalProps) => {
  const [formData, setFormData] = useState({
    
    url: "",
    
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Adding website:", formData);
    onOpenChange(false);
    try {
        const website = await axios.post('/website',{
            url: formData.url
        })
        
        if(website){
            toast.success("Website added successfully!");
        }
    } catch (error) {
        return toast.error("Error adding website. Please try again.");
    }
    // Reset form
    setFormData({
      
      url: "",
      
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[hsl(var(--card))]/95 backdrop-blur-sm border-primary/20">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Monitor className="h-6 w-6 text-primary" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-online rounded-full animate-pulse-ring" />
            </div>
            <div>
              <DialogTitle className="text-xl">Add New Website</DialogTitle>
              <DialogDescription>
                Start monitoring your website's uptime and performance
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              {/* <Label htmlFor="name" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., My Portfolio Site"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50"
                required
              /> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="url" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Website URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="bg-background/50"
                required
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="interval" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Check Interval
              </Label>
              <Select 
                value={formData.checkInterval} 
                onValueChange={(value) => setFormData({ ...formData, checkInterval: value })}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Every minute</SelectItem>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="10">Every 10 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.notificationEmail}
                onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
                className="bg-background/50"
                required
              />
            </div> */}
          </div>

          {/* Preview Card */}
          <Card className="bg-muted/30 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Monitor className="h-5 w-5 text-primary" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-online rounded-full animate-pulse-ring" />
                </div>
                <div className="flex-1">
                  {/* <h4 className="font-medium">
                    {formData.name || "Website Name"}
                  </h4> */}
                  <p className="text-sm text-muted-foreground">
                    {formData.url || "https://example.com"}
                  </p>
                </div>
                {/* <div className="text-xs text-muted-foreground">
                  Check every {formData.checkInterval} min{formData.checkInterval !== "1" ? "s" : ""}
                </div> */}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 btn-hero"
              disabled={ !formData.url }
            >
              Start Monitoring
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWebsiteModal;