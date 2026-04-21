"use client";

import Logo from "~/components/ui/logo";
import LoginForm from "../components/login-form";
import Loading from "~/components/ui/loading";
import { useEffect, useState } from "react";

const LoginCard = () => {
  return (
    <div className="w-full md:w-96 p-6 bg-main border border-white/20 rounded-lg flex flex-col justify-center items-center mt-4">
      <h3 className="w-full text-lg font-semibold text-white/90 mb-1">
        Selamat datang kembali
      </h3>
      <p className="w-full text-xs text-white/60 mb-8">
        Masuk ke akun Anda untuk melanjutkan
      </p>
      <LoginForm />
      <p className="text-xs text-white/90 mt-8">
        Presense v1.0 - SMK Bagimu Negeriku
      </p>
    </div>
  );
};

const LoginPage = () => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRendered(true);
    }, 500);
  }, [setIsRendered]);

  if (!isRendered) return <Loading />;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-primary p-2 bg-sidebar">
      <div className="h-full flex flex-col justify-start md:justify-center  items-center overflow-y-auto">
        <Logo type="hero" />
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
