import { LucideIcon, icons } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  name: keyof typeof icons;
  fallback?: keyof typeof icons;
  size?: number;
  className?: string;
}

const Icon = ({
  name,
  fallback = "CircleAlert",
  size = 24,
  className,
}: IconProps) => {
  const IconComponent: LucideIcon = icons[name] || icons[fallback];

  return (
    <IconComponent size={size} className={cn("text-current", className)} />
  );
};

export default Icon;
