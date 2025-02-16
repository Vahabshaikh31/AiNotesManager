"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useLoading } from "@/context/LoadingContext";
import { authApi } from "@/utils/api";
import { useRouter } from "next/navigation";

const GoogleLogin = () => {
  const { loading, setLoading } = useLoading();
  const router = useRouter();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        setLoading(true);
        const result = await authApi.get(`/google?code=${authResult.code}`);
        console.log("responce form the google", result.data);
        const token = result.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        router.push("/dashbaord");
        setLoading(false);
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <button
      onClick={googleLogin}
      className="w-full flex items-center justify-center gap-3 py-2 mt-4 bg-lightInputBg dark:bg-darkInputBg border border-lightInputBorder dark:border-darkInputBorder rounded-lg text-lightText dark:text-darkText hover:bg-lightCard dark:hover:bg-darkCard transition"
    >
      <FcGoogle className="text-2xl" />
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
};

export default GoogleLogin;
