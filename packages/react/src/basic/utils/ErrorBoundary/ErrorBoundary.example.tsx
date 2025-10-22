/**
 * ErrorBoundary Examples
 * Demonstrates various usage patterns for the ErrorBoundary component
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary.js";

/**
 * Component that throws an error for testing
 */
function BuggyComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("This is a test error from BuggyComponent");
  }
  return <div>Everything is working fine!</div>;
}

/**
 * Example 1: Basic Usage
 */
export function BasicExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Basic Error Boundary Example</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary>
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 2: With Custom Error Handler
 */
export function WithErrorHandlerExample() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [errorLog, setErrorLog] = useState<string[]>([]);

  return (
    <div>
      <h2>Error Boundary with Custom Handler</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary
        onError={(error, errorInfo) => {
          setErrorLog((prev) => [
            ...prev,
            `${new Date().toISOString()}: ${error.message}`,
          ]);
        }}
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>

      {errorLog.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Error Log:</h3>
          <ul>
            {errorLog.map((log) => (
              <li key={log}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Example 3: Minimal Variant
 */
export function MinimalVariantExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Minimal Error Boundary</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary variant="minimal">
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 4: Inline Variant
 */
export function InlineVariantExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Inline Error Boundary</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary variant="inline">
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 5: With Details
 */
export function WithDetailsExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Error Boundary with Details</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary showDetails={true}>
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 6: Custom Fallback UI
 */
export function CustomFallbackExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Error Boundary with Custom Fallback</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary
        fallback={
          <div
            style={{
              padding: "2rem",
              border: "2px solid red",
              borderRadius: "8px",
            }}
          >
            <h3>Custom Error UI</h3>
            <p>Something went wrong. Please contact support.</p>
          </div>
        }
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 7: Custom Fallback Function
 */
export function CustomFallbackFunctionExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Error Boundary with Function Fallback</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary
        fallback={(error, errorInfo) => (
          <div
            style={{
              padding: "2rem",
              border: "2px solid red",
              borderRadius: "8px",
            }}
          >
            <h3>Error Details</h3>
            <p>
              <strong>Error:</strong> {error.name}
            </p>
            <p>
              <strong>Message:</strong> {error.message}
            </p>
            <details>
              <summary>Component Stack</summary>
              <pre>{errorInfo.componentStack}</pre>
            </details>
          </div>
        )}
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 8: With Reset Handler
 */
export function WithResetHandlerExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Error Boundary with Reset Handler</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary
        onReset={() => {
          setShouldThrow(false);
          console.log("Error boundary reset!");
        }}
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 9: Nested Error Boundaries
 */
export function NestedErrorBoundariesExample() {
  const [outerError, setOuterError] = useState(false);
  const [innerError, setInnerError] = useState(false);

  return (
    <div>
      <h2>Nested Error Boundaries</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button type="button" onClick={() => setOuterError(true)}>
          Trigger Outer Error
        </button>
        <button type="button" onClick={() => setInnerError(true)}>
          Trigger Inner Error
        </button>
      </div>

      <ErrorBoundary variant="default">
        <div
          style={{
            padding: "1rem",
            border: "2px solid blue",
            borderRadius: "8px",
          }}
        >
          <h3>Outer Boundary</h3>
          <BuggyComponent shouldThrow={outerError} />

          <ErrorBoundary variant="minimal">
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                border: "2px solid green",
                borderRadius: "8px",
              }}
            >
              <h4>Inner Boundary</h4>
              <BuggyComponent shouldThrow={innerError} />
            </div>
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 10: Integration with Error Logging Service
 */
export function ErrorLoggingIntegrationExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Error Logging Integration</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary
        onError={(error, errorInfo) => {
          // Simulate logging to external service
          console.log("Logging to error tracking service:");
          console.log("Error:", error.message);
          console.log("Component Stack:", errorInfo.componentStack);

          // Example: Sentry integration
          // Sentry.captureException(error, {
          //   contexts: {
          //     react: {
          //       componentStack: errorInfo.componentStack,
          //     },
          //   },
          // });

          // Example: Custom analytics
          // analytics.track('Application Error', {
          //   errorName: error.name,
          //   errorMessage: error.message,
          // });
        }}
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 11: Integration with React Router
 */
export function RouterIntegrationExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>React Router Integration</h2>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary
        variant="minimal"
        onReset={() => {
          // Navigate to safe route
          // Example with React Router:
          // navigate('/');
          console.log("Would navigate to home route");
          setShouldThrow(false);
        }}
        errorMessage="This page encountered an error"
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 12: Integration with State Management
 */
export function StateManagementIntegrationExample() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [appState, setAppState] = useState({ data: "some data" });

  return (
    <div>
      <h2>State Management Integration</h2>
      <p>App State: {JSON.stringify(appState)}</p>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary
        onReset={() => {
          // Reset application state
          setAppState({ data: "reset data" });
          setShouldThrow(false);
          console.log("Application state reset");

          // Example: Redux integration
          // store.dispatch(resetAction());

          // Example: Zustand integration
          // useStore.getState().reset();

          // Example: React Query integration
          // queryClient.clear();
        }}
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Example 13: Development vs Production Mode
 */
export function DevVsProdModeExample() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div>
      <h2>Development vs Production Mode</h2>
      <p>Current Mode: {isDevelopment ? "Development" : "Production"}</p>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        style={{ marginBottom: "1rem" }}
      >
        Trigger Error
      </button>

      <ErrorBoundary
        variant="default"
        showDetails={isDevelopment}
        errorTitle={
          isDevelopment ? "Development Error" : "Something went wrong"
        }
        errorMessage={
          isDevelopment
            ? "Check the details below for debugging information"
            : "We're working to fix the issue. Please try again."
        }
        onError={(error, errorInfo) => {
          if (isDevelopment) {
            console.error("Development Error:", error);
            console.error("Component Stack:", errorInfo.componentStack);
          } else {
            // Log to production error tracking service
            console.log("Production error logged");
          }
        }}
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
}

/**
 * All Examples Component
 */
export function AllExamples() {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <BasicExample />
      <hr />
      <WithErrorHandlerExample />
      <hr />
      <MinimalVariantExample />
      <hr />
      <InlineVariantExample />
      <hr />
      <WithDetailsExample />
      <hr />
      <CustomFallbackExample />
      <hr />
      <CustomFallbackFunctionExample />
      <hr />
      <WithResetHandlerExample />
      <hr />
      <NestedErrorBoundariesExample />
      <hr />
      <ErrorLoggingIntegrationExample />
      <hr />
      <RouterIntegrationExample />
      <hr />
      <StateManagementIntegrationExample />
      <hr />
      <DevVsProdModeExample />
    </div>
  );
}
