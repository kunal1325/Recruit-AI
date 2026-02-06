import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, User, Calendar, Pause, XCircle } from "lucide-react";

/* ================= Helpers ================= */

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600 dark:text-green-400";
  if (score >= 70) return "text-amber-600 dark:text-amber-400";
  return "text-orange-600 dark:text-orange-400";
};

const getProgressColor = (score: number) => {
  if (score >= 85) return "bg-green-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-orange-500";
};

/* ================= Component ================= */

const Results = () => {
  const navigate = useNavigate();

  const stored = sessionStorage.getItem("analysisResult");

  if (!stored) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        No results found. Please run analysis again.
      </div>
    );
  }

  // ✅ NEW backend format
  // const candidates = JSON.parse(stored);

  const parsed = JSON.parse(stored);

// Handle both possible backend formats safely
const candidates = Array.isArray(parsed)
  ? parsed
  : parsed.all_candidates || [];


  const handleAction = (candidateName: string, action: string) => {
    navigate("/confirmation", { state: { candidateName, action } });
  };

  const handleStartOver = () => {
    sessionStorage.removeItem("analysisResult");
    navigate("/");
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

          <Button variant="outline" size="sm" onClick={handleStartOver}>
            New Analysis
          </Button>
        </div>
      </header>

      {/* Title */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Candidate Results
          </h1>
          <p className="mt-1 text-muted-foreground">
            {candidates.length} candidates analyzed and ranked by fit score
          </p>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl px-6 py-8">

          {candidates.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No candidates available.
            </p>
          ) : (
            <div className="space-y-4">

              {candidates.map((candidate: any, index: number) => (

                <Card
                  key={candidate.id}
                  className="overflow-hidden transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">

                    {/* Header */}

                    <div className="mb-4 flex items-start justify-between">

                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {candidate.name}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            Rank #{index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-2xl font-bold ${getScoreColor(
                              candidate.fitScore
                            )}`}
                          >
                            {candidate.fitScore}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            / 100
                          </span>
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Fit Score
                        </span>
                      </div>

                    </div>

                    {/* Progress Bar */}

                    <div className="mb-4">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full rounded-full transition-all ${getProgressColor(
                            candidate.fitScore
                          )}`}
                          style={{ width: `${candidate.fitScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Explanation */}

                    <div className="mb-5 rounded-lg bg-muted/50 p-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {candidate.explanation}
                      </p>
                    </div>

                    {/* Actions */}

                    <div className="flex gap-3">

                      <Button
                        className="flex-1"
                        onClick={() =>
                          handleAction(candidate.name, "interview")
                        }
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Interview
                      </Button>

                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() =>
                          handleAction(candidate.name, "hold")
                        }
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        Hold
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          handleAction(candidate.name, "reject")
                        }
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>

                    </div>

                  </CardContent>
                </Card>

              ))}

            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Results;
