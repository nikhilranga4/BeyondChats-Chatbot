import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, MessageSquare, LayoutDashboard, Instagram, Facebook, Linkedin } from "lucide-react";
import confetti from 'canvas-confetti';

interface TestIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  websiteUrl: string;
}

const TestIntegrationDialog = ({
  open,
  onOpenChange,
  websiteUrl,
}: TestIntegrationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const navigate = useNavigate();

  const handleTest = async () => {
    setIsLoading(true);
    // Simulate API call to test integration
    setTimeout(() => {
      // For demo, randomly succeed or fail
      const success = Math.random() > 0.3;
      setStatus(success ? "success" : "error");
      if (success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleShare = (platform: string) => {
    const text = `Just integrated my website with an AI chatbot! Check it out at ${websiteUrl}`;
    const url = websiteUrl;
    
    switch (platform) {
      case 'instagram':
        window.open(`https://instagram.com/share?url=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Test Integration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {status === "idle" && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Click the button below to test if the chatbot is properly integrated with your website.
              </p>
              <Button 
                onClick={handleTest} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Testing..." : "Test Integration"}
              </Button>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <CheckCircle className="mx-auto h-12 w-12 text-success animate-in zoom-in" />
                <h3 className="text-xl font-semibold mt-4">Integration Successful!</h3>
                <p className="text-muted-foreground">
                  Your chatbot is now ready to assist your website visitors.
                </p>
              </div>

              <div className="grid gap-4">
                <Button 
                  variant="default"
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Explore Admin Panel
                </Button>
                
                <Button 
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.open(websiteUrl, "_blank")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Talking to Your Chatbot
                </Button>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Share your success
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare('instagram')}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4">
              <XCircle className="mx-auto h-12 w-12 text-destructive animate-in zoom-in" />
              <h3 className="text-xl font-semibold">Integration Not Detected</h3>
              <p className="text-muted-foreground">
                We couldn't detect the chatbot on your website. Please make sure you've:
              </p>
              <ul className="text-sm text-muted-foreground list-disc text-left pl-4 space-y-2">
                <li>Added the integration code to your website</li>
                <li>Deployed the changes to your live website</li>
                <li>Cleared your browser cache</li>
              </ul>
              <Button 
                onClick={handleTest}
                disabled={isLoading}
                className="w-full mt-4"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestIntegrationDialog;