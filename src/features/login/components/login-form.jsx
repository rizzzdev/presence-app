import { useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Form, { Button, Input } from "~/components/ui/form";
import { toastsAtom } from "~/components/ui/toast";
import { postSession } from "~/features/session/api/session-api";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    isDisabled: false,
  });
  const { email, password, isDisabled } = loginData;
  const setToasts = useSetAtom(toastsAtom);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoginData((prev) => ({ ...prev, isDisabled: true }));

    const response = await postSession({
      email,
      password,
    });

    if (response.error) {
      setToasts((prev) => [
        ...prev,
        {
          type: "error",
          message: response.message,
        },
      ]);

      setLoginData((prev) => ({ ...prev, isDisabled: false }));
      return;
    }

    if (!response.error) {
      localStorage.setItem("access-token", response.data.accessToken);
      setToasts((prev) => [
        ...prev,
        {
          type: "success",
          message:
            "Login sukses, akan diarahkan ke halaman utama dalam beberapa saat.",
        },
      ]);

      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        htmlFor="email"
        label="Email"
        placeholder="Masukan email Anda disini..."
        value={email}
        setValue={(value) =>
          setLoginData((prev) => ({ ...prev, email: value }))
        }
      />
      <Input
        htmlFor="password"
        label="Password"
        placeholder="Masukan password Anda disini..."
        value={password}
        setValue={(value) =>
          setLoginData((prev) => ({ ...prev, password: value }))
        }
        type="password"
      />
      <div className="w-full flex justify-end items-center mt-1">
        <Link href={"/"} className="text-xs text-accent hover:underline">
          Lupa Password
        </Link>
      </div>
      <Button useMarginTop marginTop="20px" disabled={isDisabled}>
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
