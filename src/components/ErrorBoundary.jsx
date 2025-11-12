import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { Card, CardBody } from './ui/Card';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo);

    // Store error details
    this.setState({
      error,
      errorInfo,
    });

    // In production, you would log this to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardBody className="text-center py-12">
              {/* Icon */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>

              {/* Title */}
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">
                Oops! Something went wrong
              </h1>

              {/* Description */}
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We encountered an unexpected error. Don't worry, this has been logged and
                our team will look into it. Please try refreshing the page or going back home.
              </p>

              {/* Error details (development only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left bg-red-50 rounded-lg p-4 border border-red-200">
                  <summary className="cursor-pointer font-medium text-red-800 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-2 space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-red-700 mb-1">Error:</p>
                      <pre className="text-xs text-red-600 bg-white p-2 rounded overflow-x-auto">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <p className="text-xs font-semibold text-red-700 mb-1">
                          Component Stack:
                        </p>
                        <pre className="text-xs text-red-600 bg-white p-2 rounded overflow-x-auto max-h-48">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.location.reload()}
                  icon={<RefreshCw className="w-5 h-5" />}
                >
                  Refresh Page
                </Button>
                <Link to="/">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<Home className="w-5 h-5" />}
                    onClick={this.handleReset}
                  >
                    Go to Homepage
                  </Button>
                </Link>
              </div>

              {/* Help text */}
              <p className="text-xs text-gray-500 mt-8">
                If this problem persists, please{' '}
                <Link to="/contact" className="text-primary-600 hover:text-primary-700 underline">
                  contact our support team
                </Link>
              </p>
            </CardBody>
          </Card>
        </div>
      );
    }

    // Render children normally when there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
