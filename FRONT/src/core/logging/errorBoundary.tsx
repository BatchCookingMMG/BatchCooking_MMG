import React, { ReactNode } from "react";
import { logError } from "./logger";

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode; // ✅ on ajoute fallback comme prop optionnelle
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    async componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        await logError(error.message, error);
        console.error("Erreur interceptée par ErrorBoundary", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <h1>Une erreur est survenue.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
