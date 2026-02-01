import { Suspense } from "react";
import EvaluationClient from "./EvaluationClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-neutral-400">Loading evaluation…</div>}>
      <EvaluationClient />
    </Suspense>
  );
}
