import { useSetAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import Form, { Button, Input } from "~/components/ui/form";
import { toastsAtom } from "~/components/ui/toast";
import { useLogin } from "~/features/session/hooks/use-login";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    isDisabled: false,
  });
  const { email, password, isDisabled } = loginData;
  const setToasts = useSetAtom(toastsAtom);
  const { login } = useLogin();

  const handleSubmit = async () => {
    const response = await login(email, password);

    setLoginData((prev) => ({ ...prev, isDisabled: true }));

    if (response.error) {
      setToasts((prev) => [
        ...prev,
        { type: "error", message: response.error },
      ]);

      setLoginData((prev) => ({ ...prev, isDisabled: false }));
    }

    if (!response.error) {
      setToasts((prev) => [
        ...prev,
        { type: "success", message: "Login berhasil" },
      ]);

      window.location.href = "/";
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
