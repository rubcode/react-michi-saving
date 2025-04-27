import { createContext,useState } from "react";

export const ContributionsContext = createContext();

export function ContributionsProvider({ children }) {
  const [contributionsList, setContributionsList] = useState([]);

  return (
    <ContributionsContext.Provider value={{ contributionsList, setContributionsList }}>
      {children}
    </ContributionsContext.Provider>
  );
}