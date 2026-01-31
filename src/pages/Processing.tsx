import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, Loader2, CheckCircle2, FileSearch, Users, BarChart3 } from "lucide-react";

const steps = [
  { icon: FileSearch, label: "Parsing documents", duration: 1500 },
  { icon: Users, label: "Analyzing candidates", duration: 2000 },
  { icon: BarChart3, label: "Generating insights", duration: 1500 },
];

const Processing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let totalDelay = 0;

    steps.forEach((step, index) => {
      // Start step
      timers.push(
        setTimeout(() => {
          setCurrentStep(index);
        }, totalDelay)
      );

      // Complete step
      totalDelay += step.duration;
      timers.push(
        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, index]);
        }, totalDelay)
      );
    });

    // Navigate to results after all steps
    timers.push(
      setTimeout(() => {
        navigate("/results");
      }, totalDelay + 500)
    );

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-6">
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

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          {/* Animated Logo */}
          <div className="relative mx-auto mb-10 h-24 w-24">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <div className="absolute inset-2 animate-pulse rounded-full bg-primary/30" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-2xl shadow-primary/30">
              <BrainCircuit className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Analyzing Candidates
          </h1>
          <p className="mb-10 text-muted-foreground">
            Our AI is reviewing the resumes against your requirements
          </p>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isActive = currentStep === index && !isCompleted;
              const Icon = step.icon;

              return (
                <div
                  key={step.label}
                  className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${
                    isCompleted
                      ? "border-primary/30 bg-primary/5"
                      : isActive
                      ? "border-primary/50 bg-card shadow-lg"
                      : "border-border bg-muted/30 opacity-50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : isActive ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      isCompleted || isActive
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Processing;
