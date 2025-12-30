"use client"
import { User } from "../interface/user";
import { useAuthStore } from "../store/auth-store";
import { logout } from "../service/auth";

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {

  const user: User | null = useAuthStore((state) => state.user);

  const logoutRequest = async () => {
    await logout()
    useAuthStore.getState().logout();
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="flex relative">
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
