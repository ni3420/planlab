"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { User, Mail, Lock, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {RegisterSchema} from "@/features/auth/Schema"
import { useRegister } from "../api/use-Register";

type SignupFormValues = z.infer<typeof RegisterSchema>;

const SignupCard = () => {
    const Mutation=useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    Mutation.mutate({json:data})
    
  };

  const handleOAuthSignUp = (provider: "google" | "github") => {
    console.log(`Initiating sign up with ${provider}`);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
        
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create an account</h2>
          <p className="text-sm text-slate-500">Enter your details below to get started</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            type="button"
            className="w-full h-11 border-slate-200 hover:bg-slate-50 transition-colors"
            onClick={() => handleOAuthSignUp("google")}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
          <Button 
            variant="outline" 
            type="button"
            className="w-full h-11 border-slate-200 hover:bg-slate-50 transition-colors"
            onClick={() => handleOAuthSignUp("github")}
          >
            <FaGithub className="mr-2 h-5 w-5 text-slate-900" />
            GitHub
          </Button>
        </div>

        <div className="relative flex items-center justify-center text-xs uppercase">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-slate-400 font-medium">
            Or sign up with email
          </span>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="name"
                placeholder="John Doe"
                className={`pl-10 h-11 transition-all ${
                  errors.name 
                    ? "border-destructive focus-visible:ring-destructive bg-destructive/5" 
                    : "border-slate-200 focus-visible:ring-slate-400"
                }`}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                placeholder="john@example.com"
                className={`pl-10 h-11 transition-all ${
                  errors.email 
                    ? "border-destructive focus-visible:ring-destructive bg-destructive/5" 
                    : "border-slate-200 focus-visible:ring-slate-400"
                }`}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`pl-10 h-11 transition-all ${
                  errors.password 
                    ? "border-destructive focus-visible:ring-destructive bg-destructive/5" 
                    : "border-slate-200 focus-visible:ring-slate-400"
                }`}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 mt-4 transition-all font-medium" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </span>
            ) : (
              "Get Started"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="#" className="font-semibold text-slate-900 hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
};

export default SignupCard;