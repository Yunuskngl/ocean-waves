import { useAuthStore } from "@/app/store/auth-store";

export class AuthSession {
  getAccessToken(): string | null {
    return useAuthStore.getState().accessToken;
  }

  isAuthenticated(): boolean {
    return useAuthStore.getState().isAuthenticated;
  }

  setAccessToken(accessToken: string): void {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  logout(): void {
    useAuthStore.getState().logout();
  }
}
