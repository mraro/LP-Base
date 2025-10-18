import { auth } from "@/lib/auth/auth";
import AdminNav from "./_components/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If not authenticated, show children (login page will handle its own logic)
  if (!session) {
    return <>{children}</>;
  }

  // If authenticated, show admin layout with navigation
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
