import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TestIntegrationDialog from "./TestIntegrationDialog";

interface IntegrationGuideProps {
  websiteUrl: string;
}

const IntegrationGuide = ({ websiteUrl }: IntegrationGuideProps) => {
  const [showTestDialog, setShowTestDialog] = useState(false);
  const { toast } = useToast();

  const integrationCode = `<script>
  window.chatbotConfig = {
    websiteUrl: "${websiteUrl}",
    // Add other configuration options here
  };
</script>
<script src="https://cdn.example.com/chatbot.js"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(integrationCode);
    toast({
      title: "Copied to clipboard",
      description: "Integration code has been copied to your clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
          <code className="text-sm">{integrationCode}</code>
        </pre>
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2"
          onClick={handleCopy}
        >
          <Code className="mr-2 h-4 w-4" />
          Copy Code
        </Button>
      </div>

      <Button 
        className="w-full"
        onClick={() => setShowTestDialog(true)}
      >
        Test Integration
      </Button>

      <TestIntegrationDialog
        open={showTestDialog}
        onOpenChange={setShowTestDialog}
        websiteUrl={websiteUrl}
      />
    </div>
  );
};

export default IntegrationGuide;