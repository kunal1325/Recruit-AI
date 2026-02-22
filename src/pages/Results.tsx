import React from "react";
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

  const parsed = JSON.parse(stored);

  let candidates: any[] = [];

  if (parsed?.candidates) candidates = parsed.candidates;
  else if (Array.isArray(parsed) && parsed[0]?.candidates)
    candidates = parsed[0].candidates;

  /* ================= BULK STATES ================= */

  const [bulkMode, setBulkMode] = React.useState(false);
  const [selectedCandidates, setSelectedCandidates] = React.useState<any[]>([]);
  const [isScheduling, setIsScheduling] = React.useState(false);

  const WEBHOOK_URL = "http://localhost:5678/webhook-test/schedule-hr-interviews";

  /* ================= FUNCTIONS ================= */

  const toggleSelect = (candidate: any) => {
    setSelectedCandidates((prev) => {
      const exists = prev.find((c) => c.name === candidate.name);

      if (exists) {
        return prev.filter((c) => c.name !== candidate.name);
      }

      return [...prev, { name: candidate.name }];
    });
  };

  const handleBulkSchedule = async () => {
    if (!selectedCandidates.length) return;

    setIsScheduling(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selected_candidates: selectedCandidates,
        }),
      });

      alert("✅ Calendar Blocked Successfully!");
      setBulkMode(false);
      setSelectedCandidates([]);
    } catch (e) {
      alert("❌ Failed to schedule interviews");
    }

    setIsScheduling(false);
  };

  const handleAction = (candidateName: string, action: string) => {
    navigate("/confirmation", { state: { candidateName, action } });
  };

  const handleStartOver = () => {
    sessionStorage.removeItem("analysisResult");
    navigate("/");
  };

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen flex-col bg-background">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">Recruit-AI</span>
          </div>

          <div className="flex gap-3">

            {bulkMode ? (
              <Button
                size="sm"
                disabled={!selectedCandidates.length || isScheduling}
                onClick={handleBulkSchedule}
              >
                {isScheduling
                  ? "Scheduling..."
                  : `Schedule Interviews (${selectedCandidates.length})`}
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setBulkMode(true)}
              >
                Bulk Selection
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={handleStartOver}>
              New Analysis
            </Button>

          </div>
        </div>
      </header>

      {/* Title */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h1 className="text-2xl font-bold">Candidate Results</h1>
          <p className="text-muted-foreground">
            {candidates.length} candidates analyzed
          </p>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl px-6 py-8 space-y-4">

          {candidates.map((candidate, index) => (
            <Card key={candidate.name}>
              <CardContent className="p-6">

                {/* Header */}
                <div className="mb-4 flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    {bulkMode && (
                      <input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={selectedCandidates.some(
                          (c) => c.name === candidate.name
                        )}
                        onChange={() => toggleSelect(candidate)}
                      />
                    )}

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <User className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{candidate.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        Rank #{index + 1}
                      </span>
                    </div>

                  </div>

                  <div className="text-right">
                    <span
                      className={`text-2xl font-bold ${getScoreColor(
                        candidate.fitScore
                      )}`}
                    >
                      {candidate.fitScore}
                    </span>
                    <span className="text-sm"> /100</span>
                  </div>

                </div>

                {/* Progress */}
                <div className="h-2 bg-secondary rounded mb-4">
                  <div
                    className={`h-full ${getProgressColor(candidate.fitScore)}`}
                    style={{ width: `${candidate.fitScore}%` }}
                  />
                </div>

                {/* Explanation */}
                <div className="mb-5 bg-muted/50 p-4 rounded">
                  <p className="text-sm">{candidate.explanation}</p>
                </div>

                {/* Actions */}
                {!bulkMode && (
                  <div className="flex gap-3">

                    <Button
                      className="flex-1"
                      onClick={() => handleAction(candidate.name, "interview")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Interview
                    </Button>

                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => handleAction(candidate.name, "hold")}
                    >
                      <Pause className="mr-2 h-4 w-4" />
                      Hold
                    </Button>

                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleAction(candidate.name, "reject")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>

                  </div>
                )}

              </CardContent>
            </Card>
          ))}

        </div>
      </main>
    </div>
  );
};

export default Results;