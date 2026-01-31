import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BrainCircuit, CheckCircle2 } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { candidateName, action } = (location.state as { candidateName?: string; action?: string }) || {};

  const getActionMessage = () => {
    switch (action) {
      case "interview":
        return "scheduled for interview";
      case "hold":
        return "placed on hold";
      case "reject":
        return "rejected";
      default:
        return "updated";
    }
  };

  const handleBackToResults = () => {
    navigate("/results");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Recruit-AI
            </span>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>

          {/* Confirmation Message */}
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
            Candidate status updated successfully
          </h1>
          <p className="mb-8 text-muted-foreground">
            {candidateName ? (
              <>
                <span className="font-medium text-foreground">{candidateName}</span> has been {getActionMessage()}.
              </>
            ) : (
              "Action successfully applied."
            )}
          </p>

          {/* Back to Results Button */}
          <Button size="lg" onClick={handleBackToResults}>
            Back to Results
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
