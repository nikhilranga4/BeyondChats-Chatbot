import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface WebsiteStatusProps {
  companyId: string;
}

interface PageData {
  url: string;
  status: "scraped" | "pending";
  chunks?: string[];
}

const WebsiteStatus = ({ companyId }: WebsiteStatusProps) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  
  useEffect(() => {
    // Simulate fetching website scraping status
    const dummyPages: PageData[] = [
      {
        url: "/home",
        status: "scraped",
        chunks: [
          "Welcome to our company",
          "We provide innovative solutions",
          "Contact us for more information"
        ]
      },
      {
        url: "/about",
        status: "scraped",
        chunks: [
          "Our mission is to transform businesses",
          "Founded in 2020",
          "Meet our team of experts"
        ]
      },
      {
        url: "/services",
        status: "pending"
      }
    ];
    
    setPages(dummyPages);
  }, [companyId]);

  const scrapedCount = pages.filter(p => p.status === "scraped").length;
  const progress = (scrapedCount / pages.length) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">
          {scrapedCount} of {pages.length} pages scraped
        </div>
        <div className="text-sm font-medium">{Math.round(progress)}%</div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="space-y-2">
        {pages.map((page) => (
          <Sheet key={page.url}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setSelectedPage(page)}
              >
                <span className="truncate flex-1 text-left">{page.url}</span>
                <Badge variant={page.status === "scraped" ? "default" : "secondary"}>
                  {page.status}
                </Badge>
              </Button>
            </SheetTrigger>
            
            {selectedPage && (
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Content from {selectedPage.url}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {selectedPage.chunks?.map((chunk, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-muted/50 animate-in fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {chunk}
                    </div>
                  )) || (
                    <div className="text-muted-foreground">
                      Content scraping pending...
                    </div>
                  )}
                </div>
              </SheetContent>
            )}
          </Sheet>
        ))}
      </div>
    </div>
  );
};

export default WebsiteStatus;