import { RefreshQueue } from "./refresh-queue";
import { AuthSession } from "./auth-session";

type RefreshFunction = () => Promise<{ accessToken: string }>;

export class AuthRefresher {
  private isRefreshing = false;
  private refreshQueue = new RefreshQueue();

  constructor(
    private readonly refreshFunction: RefreshFunction,
    private readonly authSession: AuthSession
  ) {}

  async refreshAccessToken(): Promise<string> {
    if (this.isRefreshing) {
      await this.refreshQueue.wait();
      const token = this.authSession.getAccessToken();
      if (!token) throw new Error("Refresh completed but access token missing");
      return token;
    }

    this.isRefreshing = true;

    try {
      const { accessToken } = await this.refreshFunction();
      this.authSession.setAccessToken(accessToken);
      this.refreshQueue.resolveAll();
      return accessToken;
    } catch (err) {
      this.refreshQueue.rejectAll(err);
      this.authSession.logout();
      throw err;
    } finally {
      this.isRefreshing = false;
    }
  }
}
