import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/commons/Sidebar";
import TrendsAndFollow from "./components/commons/TrendsAndFollow";

function App() {
  return (
    <div className="flex max-w-full mx-auto px-0 md:pl-24 md:pr-36 lg:px-12">
      <div className="flex w-full">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <TrendsAndFollow />
      </div>
    </div>
  );
}

export default App;
