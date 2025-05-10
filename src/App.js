import ContainerSaving from "./components/containers/Containers/container-saving";
import ContainerGoal from "./components/containers/Containers/container-goal";
import ContainerViewSaving from "./components/containers/Containers/container-view-saving";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContributionsProvider } from "./contexts/contributionsContext";

function App() {
  return (
    <div className="App">
    <Router>
      <ContributionsProvider>
          <Routes>
            <Route path="/" element={<ContainerGoal/>} />
            <Route path="saving" element={<ContainerSaving/>} />
            <Route path="views" element={<ContainerViewSaving/>} />
          </Routes>
      </ContributionsProvider>
    </Router>
    </div>
  );
}

export default App;
