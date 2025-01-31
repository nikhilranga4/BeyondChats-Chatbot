import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Bot } from "lucide-react";

interface OrganizationCardProps {
  companyName: string;
  websiteUrl: string;
  description: string;
  onManage: () => void;
}

const OrganizationCard = ({ companyName, websiteUrl, description, onManage }: OrganizationCardProps) => {
  return (
    <Card className="bg-white/80 dark:bg-gray-800 shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl transition-transform hover:scale-105 hover:shadow-xl duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">{companyName}</CardTitle>
          <Badge variant="secondary" className="animate-pulse text-sm px-3 py-1">Active</Badge>
        </div>
        <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Globe className="h-4 w-4 text-primary" />
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all">
            {websiteUrl}
          </a>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Bot className="h-4 w-4 text-green-500" />
            <span>Chatbot Active</span>
          </div>
          <Button onClick={onManage} className="px-4 py-2 text-sm font-semibold">
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
