import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface AlertsProps {
  alerts: string[] | undefined;
}

const Alerts = (props: AlertsProps) => {
  const { alerts } = props;
  return (
    <>
      {alerts && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          {alerts.map((e, index) => (
            <AlertDescription key={index}>
              <p>{e}</p>
            </AlertDescription>
          ))}
        </Alert>
      )}
    </>
  );
};

export default Alerts;
