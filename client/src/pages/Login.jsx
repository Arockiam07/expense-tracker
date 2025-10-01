import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Layout from "../components/Layout";
import { loginUser } from "../api/api";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(formData);
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0c0f1c] dark:via-[#1a1d2e] dark:to-[#0f172a] p-4 transition-colors duration-300">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden md:flex border border-slate-200 dark:border-slate-800 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
          
          {/* Left Side - Animation */}
          <div className="md:w-5/12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
            <div className="text-center z-10">
              <Player
                autoplay
                loop
                src="/animations/login.json"
                style={{ height: "280px", width: "280px" }}
              />
              <h3 className="text-2xl font-bold text-white mt-4 mb-2">
                Welcome Back!
              </h3>
              <p className="text-blue-100 text-sm">
                Sign in to continue your financial journey
              </p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          </div>

          {/* Right Side - Login Form */}
          <div className="md:w-7/12 p-8 md:p-12 flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Welcome Back
                </h2>
                <p className="text-slate-600 dark:text-gray-400 text-lg">
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-slate-800 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-slate-800 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors duration-300 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

               
                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span className="font-semibold">Sign In</span>
                  )}
                </button>
              </form>

            
              {/* Sign Up Link */}
              <p className="text-center text-sm text-slate-600 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 hover:underline"
                >
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;