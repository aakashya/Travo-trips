import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Top-level safety net — without this, any unhandled error anywhere in the tree (a bad API
// response shape, a null a page didn't expect) unmounts the whole app and leaves a blank
// white screen with no way back. React only supports catching render errors via a class
// component's componentDidCatch/getDerivedStateFromError — there is no hook equivalent.
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("TRAVO app crashed:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#9C753B]/10 border border-[#9C753B]/20 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-[#9C753B]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black font-display uppercase tracking-tight text-neutral-900">
              Something Went Wrong
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed">
              An unexpected error interrupted this page. Reloading usually fixes it — if it keeps
              happening, our team would appreciate a heads-up.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-[#9C753B] hover:bg-[#7C552B] transition-all"
            >
              Reload Page
            </button>
            {/* Plain hard navigation, not the SPA's own router — if the crash came from broken
                app state, routing through that same state to "go home" could just crash again. */}
            <a
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-neutral-700 border border-neutral-300 hover:border-[#9C753B] hover:text-[#9C753B] transition-all"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }
}
