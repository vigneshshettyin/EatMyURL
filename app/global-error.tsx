"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import Error from "next/error";

import * as Sentry from "@sentry/nextjs";




const GlobalError: NextPage<{ error: Error }> = ({ error }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  );
}

export default GlobalError;