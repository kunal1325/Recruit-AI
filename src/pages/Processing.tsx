import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BrainCircuit,
  Loader2,
  CheckCircle2,
  FileSearch,
  Users,
  BarChart3,
} from "lucide-react";

const steps = [
  { icon: FileSearch, label: "Parsing documents", minDuration: 8000 },
  { icon: Users, label: "Analyzing candidates", minDuration: 8000 },
  { icon: BarChart3, label: "Generating insights", minDuration: 8000 },
];

const Processing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { jobDescription, jobFile, resumes } = location.state || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [backendFinished, setBackendFinished] = useState(false);

  /* =============================
     Loader animation flow
  ============================== */

  useEffect(() => {
    let cancelled = false;

    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return;

        setCurrentStep(i);

        // Always wait minimum time
        await new Promise((res) =>
          setTimeout(res, steps[i].minDuration)
        );

        // For last step → wait until backend finishes
        if (i === steps.length - 1) {
          while (!backendFinished && !cancelled) {
            await new Promise((res) => setTimeout(res, 2500));
          }
        }

        if (cancelled) return;

        setCompletedSteps((prev) => {
          if (prev.includes(i)) return prev;
          return [...prev, i];
        });
      }
    };

    runSteps();

    return () => {
      cancelled = true;
    };
  }, [backendFinished]);

  /* =============================
     Backend call
  ============================== */

  useEffect(() => {
    const callBackend = async () => {
      try {
        console.log("🚀 Starting backend call...");

        const formData = new FormData();

        // JD text
        if (jobDescription?.trim()) {
          formData.append("job_description", jobDescription);
        }

        // JD file
        if (!jobDescription?.trim() && jobFile?.length > 0) {
          formData.append("job_description", jobFile[0]);
        }

        // Resume files
        resumes?.forEach((file: File) => {
          formData.append("resumes", file);
        });

        const response = await fetch(
          "http://localhost:5678/webhook-test/recruit-ai/analyze",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        console.log("✅ Backend response:", data);

        sessionStorage.setItem("analysisResult", JSON.stringify(data));

        setBackendFinished(true);
      } catch (error) {
        console.error("❌ Backend error:", error);
      }
    };

    callBackend();
  }, []);

  /* =============================
     Final redirect after finish
  ============================== */

  useEffect(() => {
    if (backendFinished) {
      // Ensure last step looks completed
      setCompletedSteps((prev) => {
        if (prev.includes(steps.length - 1)) return prev;
        return [...prev, steps.length - 1];
      });

      // Smooth pause before result
      const timer = setTimeout(() => {
        navigate("/results");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [backendFinished, navigate]);

  /* =============================
     UI
  ============================== */

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

      {/* Main */}
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
