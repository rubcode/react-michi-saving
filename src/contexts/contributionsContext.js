import { createContext,useState,useEffect } from "react";

export const ContributionsContext = createContext();

export function ContributionsProvider({ children }) {
  const [contributionsList, setContributionsList] = useState(() => {
    const contList = localStorage.getItem("contributionsList");
    return contList ? JSON.parse(contList) : [];
  });

  useEffect(() => {
    localStorage.setItem("contributionsList", JSON.stringify(contributionsList));
  }, [contributionsList]);

  return (
    <ContributionsContext.Provider value={{ contributionsList, setContributionsList }}>
      {children}
    </ContributionsContext.Provider>
  );
}