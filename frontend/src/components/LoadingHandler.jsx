import { useState, useEffect } from 'react';
import { Loader } from './loader/loader';
const LoadingHandler = ({ children, data, timeout = 5000 }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
      setShowLoader(false);
    }, timeout);

    // If data becomes available before timeout, hide loader
    if (data !== undefined) {
      setShowLoader(false);
    }

    return () => clearTimeout(timer);
  }, [data, timeout]);

  if (showLoader) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader className="animate-spin" />
        <div className="text-lg">Loading data, please wait...</div>
      </div>
    );
  }

  // After loader is hidden, always show children regardless of data state
  return children;
};

export default LoadingHandler;