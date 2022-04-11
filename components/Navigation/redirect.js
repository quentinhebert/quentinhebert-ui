import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Redirect(props) {
  const { target } = props;
  const router = useRouter();
  const localTarget = target || "";

  console.log("Redirecting...");

  useEffect(() => {
    router.push(`/${localTarget}`);
  }, []);

  return <div />;
}
