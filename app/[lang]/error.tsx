"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const debug = true;

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Log the error to an error reporting service
    console.log("error is: ", JSON.stringify(error));
    if (debug) setErrorMessage(error.message);
  }, [error]);

  return (
    <div>
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <ExclamationTriangleIcon className="size-20 text-black" />
          <p>something went wrong...</p>
          <div className="flex flex-col items-center justify-center space-s-2">
            <p>Error: </p>
            <p>{errorMessage}</p>
          </div>
          <button
            className="bg-white text-primary border rounded w-fit px-2 py-1"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
