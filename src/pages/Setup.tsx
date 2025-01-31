import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface WebPage {
  path: string;
  status: "scraped" | "pending" | "detected";
  content?: string[];
}

const Setup = () => {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrapingProgress, setShowScrapingProgress] = useState(false);
  const [selectedPage, setSelectedPage] = useState<WebPage | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dummy data for demonstration
  const [webPages] = useState<WebPage[]>([
    { 
      path: "/home", 
      status: "scraped",
      content: ["Welcome to our company", "We provide innovative solutions", "Contact us today"]
    },
    { 
      path: "/about", 
      status: "pending",
      content: ["About our team", "Our mission and vision"]
    },
    { 
      path: "/services", 
      status: "detected",
      content: ["Service 1", "Service 2", "Service 3"]
    },
    { 
      path: "/contact", 
      status: "scraped",
      content: ["Email: info@company.com", "Phone: (555) 123-4567"]
    },
  ]);

  const fetchMetaDescription = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.data?.description) {
        setDescription(data.data.description);
        toast({
          title: "Description fetched!",
          description: "Website meta description has been automatically loaded.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching description",
        description: "Please enter the description manually.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "company",
      JSON.stringify({ companyName, websiteUrl, description })
    );
    setShowScrapingProgress(true);
  };

  const getStatusColor = (status: WebPage["status"]) => {
    switch (status) {
      case "scraped":
        return "bg-success hover:bg-success/90";
      case "pending":
        return "bg-warning hover:bg-warning/90";
      case "detected":
        return "bg-primary hover:bg-primary/90";
      default:
        return "bg-secondary hover:bg-secondary/90";
    }
  };

  if (showScrapingProgress) {
    return (
      <div className="min-h-screen p-8 animate-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Website Scraping Progress</CardTitle>
              <CardDescription>Click on any page to view scraped content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {webPages.map((page) => (
                  <div
                    key={page.path}
                    className="p-4 rounded-lg bg-background/50 cursor-pointer hover:bg-background/70 transition-colors"
                    onClick={() => setSelectedPage(page)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono">{page.path}</span>
                      <Badge className={getStatusColor(page.status)}>
                        {page.status}
                      </Badge>
                    </div>
                    {selectedPage?.path === page.path && (
                      <div className="mt-4 space-y-2 animate-in">
                        {page.content?.map((chunk, i) => (
                          <div
                            key={i}
                            className="p-2 rounded bg-background/30 text-sm"
                          >
                            {chunk}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowScrapingProgress(false)}
                >
                  Back
                </Button>
                <Button onClick={() => navigate("/dashboard")}>
                  Continue to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass animate-in">
        <CardHeader>
          <CardTitle>Setup Your Organization</CardTitle>
          <CardDescription>
            Enter your company details to get started with the chatbot setup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <div className="flex gap-2">
                <Input
                  id="websiteUrl"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fetchMetaDescription(websiteUrl)}
                  disabled={!websiteUrl || isLoading}
                >
                  {isLoading ? "Loading..." : "Fetch Description"}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Continue to Chatbot Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setup;