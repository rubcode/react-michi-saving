import ContainerSaving from "./components/containers/Containers/container-saving";
import ContainerGoal from "./components/containers/Containers/container-goal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ContainerGoal/>} />
          <Route path="saving" element={<ContainerSaving/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
