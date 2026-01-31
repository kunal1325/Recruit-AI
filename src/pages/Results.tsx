import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, User, Calendar, Pause, XCircle } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  fitScore: number;
  explanation: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    fitScore: 92,
    explanation:
      "Strong match with 7+ years of React and TypeScript experience. Demonstrated leadership in scaling frontend teams. Previous work at enterprise SaaS companies aligns well with role requirements. Excellent communication skills evident from portfolio presentations.",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    fitScore: 85,
    explanation:
      "Solid technical background with 5 years of full-stack development. Strong problem-solving skills shown through open-source contributions. Some gaps in cloud infrastructure experience but shows eagerness to learn. Good cultural fit based on collaborative project history.",
  },
  {
    id: "3",
    name: "Emily Thompson",
    fitScore: 78,
    explanation:
      "4 years of relevant experience with modern JavaScript frameworks. Strong design sensibility and attention to detail. Limited experience with large-scale systems but has worked on high-traffic applications. Positive references from previous managers.",
  },
  {
    id: "4",
    name: "David Kim",
    fitScore: 71,
    explanation:
      "3 years of frontend development experience. Solid understanding of React fundamentals. Currently transitioning from a different tech stack which may require additional onboarding time. Shows strong motivation and learning trajectory.",
  },
  {
    id: "5",
    name: "Jessica Patel",
    fitScore: 65,
    explanation:
      "Recent bootcamp graduate with impressive project portfolio. Limited professional experience but demonstrates strong foundational skills. May require mentorship but shows high potential for growth. Enthusiastic about the company mission.",
  },
];

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

const Results = () => {
  const navigate = useNavigate();

  const handleAction = (candidateId: string, action: string) => {
    // Mock navigation placeholder - would go to confirmation screen
    console.log(`Action: ${action} for candidate ${candidateId}`);
    // navigate("/confirmation", { state: { candidateId, action } });
  };

  const handleStartOver = () => {
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

      {/* Page Title */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Candidate Results
          </h1>
          <p className="mt-1 text-muted-foreground">
            {mockCandidates.length} candidates analyzed and ranked by fit score
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="space-y-4">
            {mockCandidates.map((candidate, index) => (
              <Card
                key={candidate.id}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  {/* Candidate Header */}
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

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={() => handleAction(candidate.id, "interview")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Interview
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => handleAction(candidate.id, "hold")}
                    >
                      <Pause className="mr-2 h-4 w-4" />
                      Hold
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleAction(candidate.id, "reject")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
