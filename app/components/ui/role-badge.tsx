import { Badge } from "@/components/ui/badge"
import { Shield, User, Coffee, GraduationCap } from "lucide-react"

interface RoleBadgeProps {
  role: "trainee" | "helper" | "waiter" | "admin"
  size?: "sm" | "md" | "lg"
}

export function RoleBadge({ role, size = "md" }: RoleBadgeProps) {
  const getRoleConfig = (role: string) => {
    switch (role) {
      case "trainee":
        return {
          label: "Стажер",
          variant: "outline" as const,
          icon: GraduationCap,
          color: "text-blue-600",
        }
      case "helper":
        return {
          label: "Хелпер",
          variant: "secondary" as const,
          icon: User,
          color: "text-green-600",
        }
      case "waiter":
        return {
          label: "Офіціант",
          variant: "default" as const,
          icon: Coffee,
          color: "text-purple-600",
        }
      case "admin":
        return {
          label: "Адміністратор",
          variant: "destructive" as const,
          icon: Shield,
          color: "text-red-600",
        }
      default:
        return {
          label: role,
          variant: "outline" as const,
          icon: User,
          color: "text-gray-600",
        }
    }
  }

  const config = getRoleConfig(role)
  const Icon = config.icon

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <Badge variant={config.variant} className={`${sizeClasses[size]} flex items-center gap-1`}>
      <Icon className={`${iconSizes[size]} ${config.color}`} />
      {config.label}
    </Badge>
  )
}
