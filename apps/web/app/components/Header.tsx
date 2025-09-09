"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Activity } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Uplytic</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-secondary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-foreground hover:text-secondary transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-foreground hover:text-secondary transition-colors">
              Docs
            </a>
            <a href="#contact" className="text-foreground hover:text-secondary transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <a href="/login">Sign in</a>
            </Button>
            <Button className="btn-hero" asChild>
              <a href="/signup">Get started</a>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 mt-4">
              <a href="#features" className="text-foreground hover:text-secondary transition-colors py-2">
                Features
              </a>
              <a href="#pricing" className="text-foreground hover:text-secondary transition-colors py-2">
                Pricing
              </a>
              <a href="#docs" className="text-foreground hover:text-secondary transition-colors py-2">
                Docs
              </a>
              <a href="#contact" className="text-foreground hover:text-secondary transition-colors py-2">
                Contact
              </a>
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/login">Sign in</a>
                </Button>
                <Button className="btn-hero justify-start" asChild>
                  <a href="/signup">Get started</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;