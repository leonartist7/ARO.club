import { useToast } from '../../hooks/useToast';
import Button from '../ui/Button';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

/**
 * ToastDemo component for testing toast notifications
 * Import and add this component to any page to test toasts
 *
 * @example
 * import ToastDemo from '../components/demo/ToastDemo';
 *
 * // In your page component:
 * <ToastDemo />
 */
export default function ToastDemo() {
  const toast = useToast();

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Toast Notification Demo
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Click the buttons below to test different toast types
        </p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="primary"
            icon={<CheckCircle className="w-4 h-4" />}
            onClick={() => toast.success('Success! Your action was completed successfully.')}
          >
            Show Success Toast
          </Button>

          <Button
            variant="danger"
            icon={<XCircle className="w-4 h-4" />}
            onClick={() => toast.error('Error! Something went wrong. Please try again.')}
          >
            Show Error Toast
          </Button>

          <Button
            variant="secondary"
            icon={<AlertTriangle className="w-4 h-4" />}
            onClick={() => toast.warning('Warning! Please verify your information.')}
          >
            Show Warning Toast
          </Button>

          <Button
            variant="outline"
            icon={<Info className="w-4 h-4" />}
            onClick={() => toast.info('Info: New features are now available!')}
          >
            Show Info Toast
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              toast.success('First toast');
              setTimeout(() => toast.error('Second toast'), 300);
              setTimeout(() => toast.warning('Third toast'), 600);
              setTimeout(() => toast.info('Fourth toast (queue limit: max 3 visible)'), 900);
            }}
          >
            Test Queue (Max 3)
          </Button>

          <Button
            variant="ghost"
            onClick={() => toast.info('This toast will stay for 10 seconds', 10000)}
          >
            10 Second Toast
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Usage in Your Components
          </h3>
          <pre className="text-xs text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/30 p-3 rounded overflow-auto">
{`import { useToast } from '../hooks/useToast';

function YourComponent() {
  const toast = useToast();

  const handleSave = async () => {
    try {
      // Your save logic
      toast.success('Saved successfully!');
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  return <button onClick={handleSave}>Save</button>;
}`}
          </pre>
        </div>
      </CardBody>
    </Card>
  );
}
