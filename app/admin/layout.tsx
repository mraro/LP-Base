import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import AdminNav from "./_components/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session && !children.toString().includes("login")) {
    redirect("/admin/login");
  }

  // If on login page, don't show nav
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
