import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/commons/Sidebar";
import TrendsAndFollow from "./components/commons/TrendsAndFollow";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "./components/commons/LoadingSpinner";
import NotificationPage from "./pages/notification/NotificationPage";
import StatusPage from "./pages/status/StatusPage";
import "./App.css";

function App() {
  const {
    data: authUser,
    /* error,
    isError, */
    isLoading,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/auth/mydata");
        /* console.log("response", response); */
        return response.data;
      } catch (error) {
        console.log("ERROR", error);
        if (error.response.data.error) return null;
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner width="lg" />
      </div>
    );
  }

  return (
    <div className="flex max-w-full mx-auto px-0 md:pl-24 md:pr-36 lg:px-12 min-h-screen">
      <div className="flex w-full">
        {authUser && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/:username"
            /* path="/profile" */
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/notifications"
            element={authUser ? <NotificationPage /> : <Navigate to="login" />}
          />
          <Route
            path="/:username/status/:postId"
            element={authUser ? <StatusPage /> : <Navigate to="login" />}
          />
        </Routes>
        {authUser && <TrendsAndFollow />}
        <Toaster />
      </div>
    </div>
  );
}

export default App;
