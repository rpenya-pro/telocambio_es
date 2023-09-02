import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          <p>ERROR: ha habido un problema en esta zona del código!!!</p>
          <details
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "13px",
              fontFamily: "Courier",
            }}
          >
            <summary>Detalles del error</summary>
            <b>{this.state.error && this.state.error.toString()}</b>
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
