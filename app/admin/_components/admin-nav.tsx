"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Settings, LogOut, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: Users,
  },
  {
    href: "/admin/tracking-setup",
    label: "Setup de Tracking",
    icon: TrendingUp,
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="font-bold text-lg">
              Admin Panel
            </Link>
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>
    </nav>
  );
}
