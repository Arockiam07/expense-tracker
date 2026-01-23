import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LoaderProvider } from "./context/LoaderContext";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy Load Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Landing = lazy(() => import("./pages/Landing"));

// Lazy Load Components
const AddTransaction = lazy(() => import("./components/AddTransaction"));
const Transactions = lazy(() => import("./components/Transactions"));
const Budget = lazy(() => import("./components/Budget"));
const Charts = lazy(() => import("./components/Charts"));

function App() {
  return (
    <ThemeProvider>
      <LoaderProvider>
        {/* ✅ Global Loader */}
        <Loader />

        <Router>
          {/* ✅ Toast container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          {/* ✅ Routes with Suspense */}
          <Suspense fallback={<Loader forceShow={true} />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/add" element={<AddTransaction />} />
            </Routes>
          </Suspense>
        </Router>
      </LoaderProvider>
    </ThemeProvider>
  );
}

export default App;
