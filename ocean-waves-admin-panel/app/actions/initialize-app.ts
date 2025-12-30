import { refreshAccessToken } from "../service/auth";
import { getMe } from "../service/profile";
import { useAuthStore } from "../store/auth-store";
import { useLoadingStore } from "../store/loading-store";

export const initializeApp = async () => {
  const setLoading = useLoadingStore.getState().setLoading;
  try {
    setLoading(true, "Initializing app...");
    const { accessToken } = await refreshAccessToken();
    useAuthStore.getState().setAccessToken(accessToken);
    const profile = await getMe();
    useAuthStore.getState().login(profile);
  } catch (error) {
    console.log("user not authenticated");
  } finally {
    setLoading(false);
  }
};
