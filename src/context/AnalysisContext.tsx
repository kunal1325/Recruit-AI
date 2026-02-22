import { createContext, useContext, useState } from "react";

const AnalysisContext = createContext<any>(null);

export const AnalysisProvider = ({ children }: any) => {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <AnalysisContext.Provider value={{ analysisResult, setAnalysisResult }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
