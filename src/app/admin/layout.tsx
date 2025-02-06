import "@/styles/admin.css";
import { db } from "@/db";
import { users } from "@/db/schema";
import { authOptions } from "@/lib/auth.config";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <AdminHeader session={session} />
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
