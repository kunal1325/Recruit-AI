import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { Sparkles, BrainCircuit } from "lucide-react";

const Upload = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = React.useState("");
  const [jobFile, setJobFile] = React.useState<File[]>([]);
  const [resumes, setResumes] = React.useState<File[]>([]);

  const handleAnalyze = () => {
    navigate("/processing");
  };

  const isReady = (jobDescription.trim() || jobFile.length > 0) && resumes.length > 0;

  return (
    <div className="min-h-screen bg-background">
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Hiring</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Find Your Perfect Candidate
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Upload a job description and resumes to get AI-powered insights
          </p>
        </div>

        <div className="space-y-8">
          {/* Job Description Section */}
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Job Description
              </h2>
              <p className="text-sm text-muted-foreground">
                Paste the job requirements or upload a file
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here...

Example:
We are looking for a Senior Software Engineer with 5+ years of experience in React, TypeScript, and Node.js. The ideal candidate will have strong problem-solving skills and experience with cloud infrastructure..."
                className="min-h-[180px] resize-none rounded-xl border-border bg-background text-sm leading-relaxed placeholder:text-muted-foreground/60"
              />

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  or upload file
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <FileUpload
                label="Upload job description file"
                helperText="PDF, DOC, DOCX, or TXT"
                accept=".pdf,.doc,.docx,.txt"
                files={jobFile}
                onFilesChange={setJobFile}
              />
            </div>
          </section>

          {/* Resume Upload Section */}
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Candidate Resumes
              </h2>
              <p className="text-sm text-muted-foreground">
                Upload one or more resumes to analyze
              </p>
            </div>

            <FileUpload
              label="Upload resume files"
              helperText="PDF, DOC, or DOCX • Multiple files supported"
              multiple
              accept=".pdf,.doc,.docx"
              files={resumes}
              onFilesChange={setResumes}
            />

            {resumes.length > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  {resumes.length} resume{resumes.length !== 1 ? "s" : ""} ready for analysis
                </span>
              </div>
            )}
          </section>

          {/* CTA Button */}
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={!isReady}
              className="h-14 px-10 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:shadow-none"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Analyze Candidates
            </Button>
          </div>

          {!isReady && (
            <p className="text-center text-sm text-muted-foreground">
              Add a job description and at least one resume to continue
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Upload;
