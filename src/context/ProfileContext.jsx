import { createContext, useContext, useState } from "react";

export const DEFAULT_PROFILE = {
  name: "Ram Sharma",
  college: "National Law University, Delhi",
  year: "3rd Year",
  program: "B.A. LLB",
  email: "",
  marks: 88,
  studentRank: 12,
  totalStudents: 340,
  collegeRank: 3,
  totalColleges: 48,
  competitionsWon: 3,
  webinarsAttended: 14,
  points: 4820,
  progress: 75,
  internships: 6,
  courses: 10,
};

export const getInitials = (name) => {
  const parts = (name || "").trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0] || "U").slice(0, 2).toUpperCase();
};

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [isFirstVisit] = useState(() => !localStorage.getItem("lo_profile"));

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("lo_profile");
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [modalOpen, setModalOpen] = useState(() => !localStorage.getItem("lo_profile"));

  const updateProfile = (data) => {
    const updated = { ...profile, ...data };
    setProfile(updated);
    localStorage.setItem("lo_profile", JSON.stringify(updated));
    setModalOpen(false);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, modalOpen, setModalOpen, isFirstVisit }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
