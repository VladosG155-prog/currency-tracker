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
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
