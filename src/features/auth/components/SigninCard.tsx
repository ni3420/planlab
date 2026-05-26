import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Mail, Lock, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {useLogin} from "@/features/auth/api/use-login"
import { LoginSchema } from "../Schema";
import { Mutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";


type SignInFormValues = z.infer<typeof LoginSchema>;

const SignInCard = () => {
    const mutation=useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    mutation.mutate({json:data},{
        onSuccess:()=>{
            redirect("/")
        }
    })
  };

  const handleOAuthSignIn = (provider: "google" | "github") => {
    console.log(`Initiating sign in with ${provider}`);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
        
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
          <p className="text-sm text-slate-500">Enter your credentials to access your account</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            type="button"
            className="w-full h-11 border-slate-200 hover:bg-slate-50 transition-colors"
            onClick={() => handleOAuthSignIn("google")}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
          <Button 
            variant="outline" 
            type="button"
            className="w-full h-11 border-slate-200 hover:bg-slate-50 transition-colors"
            onClick={() => handleOAuthSignIn("github")}
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
            Or continue with
          </span>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </Label>
              <a href="#" className="text-xs text-primary hover:underline font-medium">
                Forgot password?
              </a>
            </div>
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-semibold text-slate-900 hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
};

export default SignInCard;