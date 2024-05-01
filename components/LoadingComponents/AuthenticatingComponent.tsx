import React from "react";

const AuthenticatingComponent = () => {
  return (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
        </div>
    </div>
  );
};

export default AuthenticatingComponent;

