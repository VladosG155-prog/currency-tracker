import { Component, ReactNode } from 'react';

interface IErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

