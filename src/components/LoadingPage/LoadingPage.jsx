import { Loader } from "lucide-react";

export default function LoadingPage() {
  return (
    <div role="status" aria-live="polite">
      <h1>Loading...</h1>
      <Loader aria-hidden="true"></Loader>
      <p>Preparing your curated shop...</p>
    </div>
  );
}
