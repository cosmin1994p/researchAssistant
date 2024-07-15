import React from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

import "../app/globals.css";

export default function Authenticate(): React.ReactNode{
  return <>
    <LoginLink className="btn btn-ghost sign-in-btn">
      Sign in
    </LoginLink>
    <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
  </>
}