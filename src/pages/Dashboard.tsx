import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OrganizationCard from "@/components/OrganizationCard";

interface Organization {
  companyName: string;
  websiteUrl: string;
  description: string;
}

const Dashboard = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedOrg = localStorage.getItem("company");
    if (storedOrg) {
      setOrganizations([JSON.parse(storedOrg)]);
    }
  }, []);

  const handleAddOrganization = () => {
    navigate("/setup");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  const handleManageOrganization = (org: Organization) => {
    localStorage.setItem("company", JSON.stringify(org));
    navigate("/dashboard/manage");
  };

  return (
    <div className="relative min-h-screen p-6 md:p-8 animate-in overflow-hidden">
      {/* Background Bubbles Animation */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="bubbles-animation"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Organizations
          </h1>
          <div className="flex items-center gap-3 md:gap-4">
            <Button onClick={handleAddOrganization} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Organization</span>
            </Button>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Organizations Section */}
        {organizations.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No Organizations Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Get started by adding your first organization
            </p>
            <Button onClick={handleAddOrganization} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Organization
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org, index) => (
              <OrganizationCard
                key={index}
                {...org}
                onManage={() => handleManageOrganization(org)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
