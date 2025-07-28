'use client'


import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function LoginBtn({variant, text, size}: {variant:"link" | "outline", text:string, size:"default"|"lg"}) {
  const handleLogin = async () => {
    try {
      await authClient.signIn.social({ 
        provider: "google", 
        callbackURL: "/" 
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
     <Button
     onClick={handleLogin}
     variant={variant}
     size={size}
     >
        {text}
     </Button>
  );
}