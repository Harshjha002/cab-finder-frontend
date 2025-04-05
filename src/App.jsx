import Navbar from "./components/Navbar"
import { ThemeProvider } from "./Context/ThemeProvider"
import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom"
import SignUpForm from "./pages/SignUpForm"
import SignInPage from "./pages/SignInPage"
import Dashboard from "./pages/Dashboard"
import { Toaster } from "./components/ui/sonner"
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
      <Toaster richColors position="top-right" duration={3000} />

    </ThemeProvider>
  )
}

export default App
