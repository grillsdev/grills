"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
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
    <div>
      Hello World in home page
      <div className="mt-4">
        <Button variant="outline" onClick={handleLogin}>
          Login with Google
        </Button>
      </div>
    </div>
  );
}