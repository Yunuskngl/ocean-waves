"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../service/auth";
import { getMe } from "../../service/profile";
import { useAuthStore } from "../../store/auth-store";
import { useLoadingStore } from "../../store/loading-store";
import ShortLoadingScreen from "../../components/ui/short-loading";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setLoading = useLoadingStore((state) => state.setLoading);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const loginUser = useAuthStore((state) => state.login);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setLoading(true, "Giriş yapılıyor...");

    try {
      const { accessToken } = await login({ email, password });
      setAccessToken(accessToken);
      
      const user = await getMe();
      loginUser(user);
      
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
        const errorMessage = axiosError.response?.data?.error?.message || "Giriş yapılırken bir hata oluştu";
        setError(errorMessage);
      } else {
        setError("Giriş yapılırken bir hata oluştu");
      }
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md relative">
        {isSubmitting && (
          <ShortLoadingScreen 
            message="Giriş yapılıyor..." 
            variant="overlay" 
            size="md"
          />
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Paneli
            </h1>
            <p className="text-gray-600">
              Hesabınıza giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#e23e3e] focus:border-[#e23e3e] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 bg-white"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#e23e3e] focus:border-[#e23e3e] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#e23e3e] text-white py-2 px-4 rounded-md font-medium hover:bg-[#c73535] focus:outline-none focus:ring-2 focus:ring-[#e23e3e] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

