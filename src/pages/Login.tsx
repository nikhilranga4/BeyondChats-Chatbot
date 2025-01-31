import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleLogin = () => {
    // Predefined credentials for demo
    const demoUser = {
      name: "Demo User",
      email: "demo@example.com",
      password: "demo123"
    };
    localStorage.setItem("user", JSON.stringify(demoUser));
    toast({
      title: "Success!",
      description: "Logged in with Google successfully",
    });
    navigate("/dashboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        toast({
          title: "Success!",
          description: "Logged in successfully",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid credentials",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-in">
      <Card className="w-full max-w-md glass hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back!</CardTitle>
          <CardDescription>Login to access your chatbot dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-all duration-300 hover:border-primary focus:border-primary"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="transition-all duration-300 hover:border-primary focus:border-primary"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover transition-colors duration-300">
              Login
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full group relative overflow-hidden transition-all duration-300 hover:border-primary"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              <span>Continue with Google</span>
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline transition-all duration-300">
                Register here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;