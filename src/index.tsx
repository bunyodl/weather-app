/* @refresh reload */
import { render, Suspense, ErrorBoundary } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root");

render(
  () => (
    <ErrorBoundary fallback={<div>Error. Something went wrong.</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  ),
  root!,
);
