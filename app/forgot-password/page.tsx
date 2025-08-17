"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import Link from "next/link";
import FloatingShape from "@/app/components/FloatingShape";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-orange-700 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-orange-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-red-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-orange-600" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/10 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
              Забули пароль?
            </h2>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-white/80 text-center text-sm mb-6">
                Введіть вашу електронну пошту і ми надішлемо посилання для відновлення пароля
              </p>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Електронна пошта"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Надсилання...
                  </div>
                ) : (
                  "Надіслати посилання"
                )}
              </motion.button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-20 h-20 bg-gradient-to-r from-orange-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Лист надіслано!</h3>
                <p className="text-white/80 text-sm">
                  Якщо акаунт з адресою <span className="font-medium text-orange-300">{email}</span> існує, ви незабаром
                  отримаєте посилання для відновлення пароля.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-white/5 border-t border-white/10 flex justify-center">
          <Link
            href="/login"
            className="text-sm text-orange-400 hover:text-orange-300 flex items-center transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Повернутися до входу
          </Link>
        </div>
      </motion.div>
    </div>
  )
};

export default ForgotPasswordPage; 