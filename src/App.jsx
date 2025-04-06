import Navbar from "./components/Navbar"
import { ThemeProvider } from "./Context/ThemeProvider"
import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom"
import SignUpForm from "./pages/SignUpForm"
import SignInPage from "./pages/SignInPage"
import Dashboard from "./pages/Dashboard"
import { Toaster } from "./components/ui/sonner"
import CabFinder from "./pages/CabFinder"
import CabList from "./pages/CabList"
import ProtectedRoute from "./components/ProtectedRouute"
import ContactOwner from "./pages/ContactOwner"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/dashboard/:id"
          element={
            <ProtectedRoute requireOwner={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/cab-finder/find-cab-form" element={<CabFinder />} />
        <Route path="/cab-finder/find-cab" element={<CabList />} />
        <Route
          path="/cab-finder/contact-owner/:cabId"
          element={
            <ProtectedRoute>
              <ContactOwner />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster richColors position="top-right" duration={3000} />
    </ThemeProvider>
  );
}

export default App;

