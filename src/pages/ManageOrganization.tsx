import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import WebsiteStatus from "@/components/WebsiteStatus";
import IntegrationGuide from "@/components/IntegrationGuide";

interface Organization {
  companyName: string;
  websiteUrl: string;
  description: string;
}

const ManageOrganization = () => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrg = localStorage.getItem("company");
    if (storedOrg) {
      setOrganization(JSON.parse(storedOrg));
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  if (!organization) return null;

  return (
    <div className="relative min-h-screen p-6 md:p-8 animate-in overflow-hidden">
      {/* Background Bubbles Animation */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="bubbles-animation"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Back Button - Left Aligned on Mobile */}
          <div className="self-start md:self-auto">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-semibold">Back</span>
            </Button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {organization.companyName}
          </h1>
        </div>

        {/* Responsive Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass shadow-lg transition transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Website Status</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Track the progress of website scraping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WebsiteStatus companyId="1" />
            </CardContent>
          </Card>

          <Card className="glass shadow-lg transition transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Chatbot Integration</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Test and integrate your chatbot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IntegrationGuide websiteUrl={organization.websiteUrl} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageOrganization;
