import type { InterruptEvent } from "../types";

interface Props {
  interrupt: InterruptEvent;
  onApprove: () => void;
  onReject: () => void;
  isProcessing: boolean;
}

export function ApprovalDialog({ interrupt, onApprove, onReject, isProcessing }: Props) {
  return (
    <div className="mx-4 my-3">
      <div className="overflow-hidden rounded-lg bg-yellow-400/5 inset-ring inset-ring-yellow-400/20">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-yellow-400/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-yellow-400 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <span className="text-sm font-semibold text-yellow-400">Approval Required</span>
        </div>

        {/* Tool calls awaiting approval */}
        <div className="px-4 py-3 space-y-3">
          {interrupt.tool_calls.map((tc) => (
            <div key={tc.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-yellow-400" />
                <span className="text-sm font-mono font-medium text-white">{tc.name}</span>
              </div>
              {tc.args && Object.keys(tc.args).length > 0 && (
                <pre className="p-2 bg-gray-950 rounded text-xs text-gray-400 overflow-x-auto max-h-32 overflow-y-auto">
                  {JSON.stringify(tc.args, null, 2)}
                </pre>
              )}
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={onApprove}
              disabled={isProcessing}
              className="rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Approve"}
            </button>
            <button
              onClick={onReject}
              disabled={isProcessing}
              className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20 inset-ring inset-ring-white/5 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
