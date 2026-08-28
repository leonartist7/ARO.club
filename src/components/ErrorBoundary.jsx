import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './ui/Button';
import { Card, CardBody } from './ui/Card';

/**
 * ErrorBoundary component to catch React errors
 * - Catches JavaScript errors anywhere in the child component tree
 * - Logs errors and displays a fallback UI
 * - Shows error details in development mode
 * - Provides reset button to recover
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // You could also log to an error reporting service here
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
      const isDev = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardBody className="text-center py-12">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Oops! Something went wrong
              </h1>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We encountered an unexpected error. Don't worry, our team has been notified.
              </p>

              {/* Error Details (Dev Mode Only) */}
              {isDev && this.state.error && (
                <div className="mb-8 text-left">
                  <details className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <summary className="font-semibold text-red-900 dark:text-red-100 cursor-pointer mb-2">
                      Error Details (Development Mode)
                    </summary>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
                          Error:
                        </h4>
                        <pre className="text-xs text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900/20 p-2 rounded overflow-auto">
                          {this.state.error.toString()}
                        </pre>
                      </div>
                      {this.state.errorInfo && (
                        <div>
                          <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
                            Component Stack:
                          </h4>
                          <pre className="text-xs text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900/20 p-2 rounded overflow-auto max-h-64">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  icon={<RefreshCw className="w-4 h-4" />}
                  onClick={this.handleReset}
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  icon={<Home className="w-4 h-4" />}
                  onClick={() => (window.location.href = '/')}
                >
                  Go to Homepage
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
