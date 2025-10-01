import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { Eye, EyeOff, User, Mail, Lock, Check } from "lucide-react";
import Layout from "../components/Layout";
import { signupUser } from "../api/api"; 
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "bg-green-500";
    if (passwordStrength >= 50) return "bg-yellow-500";
    if (passwordStrength >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return "Strong";
    if (passwordStrength >= 50) return "Medium";
    if (passwordStrength >= 25) return "Weak";
    return "Very Weak";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      showErrorToast("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      showErrorToast("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      await signupUser(formData);
      showSuccessToast("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      showErrorToast(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One number", met: /[0-9]/.test(formData.password) },
    { text: "One special character", met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#0c0f1c] dark:via-[#1a1d2e] dark:to-[#0f172a] p-4 transition-colors duration-300">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden md:flex border border-slate-200 dark:border-slate-800 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
          
          {/* Left Side - Animation */}
          <div className="md:w-5/12 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
            <div className="text-center z-10">
              <Player
                autoplay
                loop
                src="/animations/signup.json"
                style={{ height: "250px", width: "250px" }}
                className="md:h-[280px] md:w-[280px]"
              />
              <h3 className="text-xl md:text-2xl font-bold text-white mt-4 mb-2">
                Join Us Today!
              </h3>
              <p className="text-green-100 text-sm md:text-base px-4">
                Start your financial journey with powerful tools
              </p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="md:w-7/12 p-6 md:p-8 lg:p-12 flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="w-full max-w-md">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 md:mb-3">
                  Create Account
                </h2>
                <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base">
                  Sign up to get started with your financial management
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Name Field */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors duration-300">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 md:py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-green-500 dark:focus:border-green-400 text-slate-800 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base"
                  />
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors duration-300">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 md:py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-green-500 dark:focus:border-green-400 text-slate-800 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base"
                  />
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors duration-300">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 md:py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-green-500 dark:focus:border-green-400 text-slate-800 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-green-500 transition-colors duration-300 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 dark:text-gray-400">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength >= 75 ? "text-green-600" :
                        passwordStrength >= 50 ? "text-yellow-600" :
                        passwordStrength >= 25 ? "text-orange-600" : "text-red-600"
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="grid grid-cols-1 gap-1 mt-3">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check 
                            size={14} 
                            className={`${
                              req.met ? "text-green-500" : "text-slate-400"
                            }`} 
                          />
                          <span className={`text-xs ${
                            req.met ? "text-green-600" : "text-slate-500"
                          }`}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-xs md:text-sm text-slate-600 dark:text-gray-400">
                    I agree to the{" "}
                    <a href="/terms" className="text-green-600 dark:text-green-400 hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                {/* Signup Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 dark:focus:ring-green-400/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm md:text-base font-semibold"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </form>

             

              {/* Login Link */}
              <p className="text-center text-xs md:text-sm text-slate-600 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-all duration-300 hover:underline"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;