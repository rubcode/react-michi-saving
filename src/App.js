import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/authContext";
import { GoalsProvider } from "./contexts/goalsContext";
import CreateProfilePage from "./pages/CreateProfilePage";
import UnlockPage from "./pages/UnlockPage";
import Dashboard from "./pages/Dashboard";
import GoalsPage from "./pages/GoalsPage";
import NewGoalPage from "./pages/NewGoalPage";
import GoalDetailPage from "./pages/GoalDetailPage";
import ActivityPage from "./pages/ActivityPage";
import ProfilePage from "./pages/ProfilePage";

function AppContent() {
  const { profile, unlocked, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!profile) {
    return <CreateProfilePage />;
  }

  if (!unlocked) {
    return <UnlockPage />;
  }

  return (
    <GoalsProvider>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/goals" element={<GoalsPage/>} />
        <Route path="/goals/new" element={<NewGoalPage/>} />
        <Route path="/goals/:id" element={<GoalDetailPage/>} />
        <Route path="/activity" element={<ActivityPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </GoalsProvider>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
