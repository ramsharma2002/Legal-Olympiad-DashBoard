import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProfileProvider, useProfile } from "./context/ProfileContext";
import ProfileSetupModal from "./components/ui/ProfileSetupModal";
import Dashboard from "./pages/Dashboard";
import Internships from "./pages/Internships";
import Courses from "./pages/Courses";
import Achievements from "./pages/Achievements";
import Performance from "./pages/Performance";
import NotFound from "./pages/NotFound";

const AppContent = () => {
  const { modalOpen, setModalOpen, updateProfile, profile, isFirstVisit } = useProfile();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ProfileSetupModal
        open={modalOpen}
        onSave={updateProfile}
        onClose={!isFirstVisit ? () => setModalOpen(false) : undefined}
        initialData={profile}
      />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;