import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-fade-in">
          Build Your AI Chatbot
        </h1>
        <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
          Create, train, and deploy custom AI chatbots for your business in minutes.
          No coding required.
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Button asChild size="lg" className="text-lg">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 glass rounded-xl space-y-4"
            style={{ animation: "fade-in 0.3s ease-out forwards", animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 text-primary">
              <feature.icon />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    title: "Easy Setup",
    description: "Get your chatbot up and running in minutes with our simple setup process.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "AI-Powered",
    description: "Leverage advanced AI to provide accurate and helpful responses to your customers.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Your chatbot works around the clock to support your customers whenever they need help.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default Index;