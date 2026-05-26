"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname()

  const isSignInPage = pathname?.includes("sign-in") || pathname?.includes("login");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-6 md:px-12 flex items-center justify-between transition-all">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-md shadow-slate-900/10 transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            Plan<span className="text-slate-500 font-medium">Lab</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-slate-500 font-medium">
            {isSignInPage ? "New to AuthFlow?" : "Already have an account?"}
          </span>
          <Button 
            asChild
            variant={isSignInPage ? "default" : "outline"}
            className="h-9 rounded-xl px-4 text-sm font-semibold transition-all shadow-sm"
          >
            <Link href={isSignInPage ? "/sign-up" : "/sign-in"}>
              {isSignInPage ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-16">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;