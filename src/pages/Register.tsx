import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp] = useState(() => Math.floor(100000 + Math.random() * 900000));
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
    navigate("/setup");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationStep) {
      setVerificationStep(true);
      toast({
        title: "Verification Code Sent!",
        description: `Your OTP is: ${generatedOtp}`,
      });
    } else {
      if (otp === generatedOtp.toString()) {
        localStorage.setItem("user", JSON.stringify({ name, email, password }));
        toast({
          title: "Success!",
          description: "Registration successful",
        });
        navigate("/setup");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid OTP",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-in animated-background">
      <Card className="w-full max-w-md glass hover-lift">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Create Account</CardTitle>
          <CardDescription>
            {verificationStep ? "Enter verification code" : "Sign up to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!verificationStep ? (
              <>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-hover"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-hover"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-hover"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-hover button-hover"
                >
                  Register
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full button-hover group relative"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  <span>Continue with Google</span>
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary-hover underline-offset-4 hover:underline transition-all duration-300"
                  >
                    Login here
                  </Link>
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="text-center text-lg tracking-wider input-hover"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Verification code: {generatedOtp}
                </p>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-hover button-hover"
                >
                  Verify
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;