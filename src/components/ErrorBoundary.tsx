import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#090a08] text-[#f6f0e4] px-6 text-center">
          <h1 className="font-serif text-3xl text-[#d8ad53] mb-3">
            Naija Pot Kitchen &amp; Grill
          </h1>
          <p className="text-sm text-[#f6f0e4]/80 mb-6 max-w-md">
            Something went wrong while loading this view. Please reload the page to continue.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-[#d8ad53] text-[#090a08] font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
