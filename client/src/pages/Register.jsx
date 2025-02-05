import React from "react";
import OtpLogin from "../components/OtpLogin";
import { GitLogin } from "../components/githubLogin";
import GoogleLogin from "../components/GoogleLogin";

export const Register = () => {
  return (
    <>
      <OtpLogin />
      <GoogleLogin />
      <GitLogin />
      <button>have an accout ?</button>
    </>
  );
};
