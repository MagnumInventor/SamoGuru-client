"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import FloatingShape from "@/app/components/FloatingShape";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoading, error } = useAuthStore();
  	const [showPassword, setShowPassword] = useState(false)
  	const [rememberMe, setRememberMe] = useState(false)

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		await login(email, password);
	};

return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-indigo-800 to-orange-700 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-orange-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-indigo-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-orange-600" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/10 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-indigo-400 text-transparent bg-clip-text">
              Ласкаво просимо
            </h2>
            <p className="text-white/80 text-sm">Увійдіть до вашого акаунту СамоГуру</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="email"
                placeholder="Електронна пошта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-orange-600 bg-white/10 border-white/20 rounded focus:ring-orange-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-white/80">Запам'ятати мене</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-orange-400 hover:text-orange-300 transition-colors duration-200"
              >
                Забули пароль?
              </Link>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-orange-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Вхід...
                </div>
              ) : (
                "Увійти"
              )}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 bg-white/5 border-t border-white/10 flex justify-center">
          <p className="text-sm text-white/60">
            Немає акаунту?{" "}
            <Link
              href="/signup"
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200">
              Зареєструватися
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
};

export default LoginPage; 