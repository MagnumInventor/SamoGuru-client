"use client"

import { motion } from "framer-motion";
import { Loader, Lock, Mail, User, Eye, EyeOff, Users } from "lucide-react"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordStrengthMeter from "@/app/components/PasswordStrengthMeter";
import FloatingShape from "@/app/components/FloatingShape";
import { useAuthStore, USER_ROLES } from "@/app/store/authStore"

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showRoleDropdown, setShowRoleDropdown] = useState(false);
	const router = useRouter();

	const { signup, error, isLoading } = useAuthStore();
  	const [showPassword, setShowPassword] = useState(false)
  	const [role, setRole] = useState("trainee")

const roleOptions = [
  { value: USER_ROLES.TRAINEE, label: "Стажер", description: "Новий працівник на навчанні" },
  { value: USER_ROLES.HELPER, label: "Помічник", description: "Малий/мала - помічник офіціанта" },
  { value: USER_ROLES.WAITER, label: "Офіціант", description: "Фіц - рядовий офіціант" },
  { value: USER_ROLES.ADMIN, label: "Адміністратор", description: "Менеджмент та управління" }
]

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await signup(email, password, name, role);
			router.push("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	const selectedRole = roleOptions.find(option => option.value === role);

return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-indigo-800 to-orange-700 flex items-center justify-center relative overflow-hidden py-8">
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
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-indigo-400 text-transparent bg-clip-text">
              Створити акаунт
            </h2>
            <p className="text-white/80 text-sm">Приєднуйтесь до команди СамоГуру</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Повне ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              />
            </div>

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

{/* Role Selection Dropdown */}
						<div className="relative">
							<Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
							<button
								type="button"
								onClick={() => setShowRoleDropdown(!showRoleDropdown)}
								className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-left"
							>
								{selectedRole ? selectedRole.label : "Оберіть роль"}
							</button>
							
							{showRoleDropdown && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="absolute top-full left-0 right-0 mt-1 bg-white/15 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl z-10"
								>
									{roleOptions.map((option) => (
										<button
											key={option.value}
											type="button"
											onClick={() => {
												setRole(option.value);
												setShowRoleDropdown(false);
											}}
											className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
										>
											<div className="text-white font-medium">{option.label}</div>
											<div className="text-white/70 text-xs">{option.description}</div>
										</button>
									))}
								</motion.div>
							)}
						</div>

            {password && <PasswordStrengthMeter password={password} />}

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            <motion.button
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-orange-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2" size={20} />
                  Реєстрація...
                </div>
              ) : (
                "Створити акаунт"
              )}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 bg-white/5 border-t border-white/10 flex justify-center">
          <p className="text-sm text-white/60">
            Вже маєте акаунт?{" "}
            <Link
              href="/auth/login"
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
            >
              Увійти
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage; 