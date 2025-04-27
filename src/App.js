import ContainerSaving from "./components/containers/Containers/container-saving";
import ContainerGoal from "./components/containers/Containers/container-goal";
import ContainerViewSaving from "./components/containers/Containers/container-view-saving";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ContainerGoal/>} />
          <Route path="saving" element={<ContainerSaving/>} />
          <Route path="views" element={<ContainerViewSaving/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
