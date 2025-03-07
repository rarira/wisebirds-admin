"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { useState } from "react";
import { useErrorStore } from "@/lib/stores";
import ErrorDialog from "../dialog/error";
import { createPortal } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";

function Providers({ children }: { children: React.ReactNode }) {
  const { error, setError } = useErrorStore();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorDialog}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      {!!error &&
        createPortal(
          <ErrorDialog
            error={error}
            resetErrorBoundary={() => setError(null)}
          />,
          document.body
        )}
    </>
  );
}

export default Providers;
