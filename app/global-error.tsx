"use client";

import { NextPage } from "next";
import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";
import exp from "constants";


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