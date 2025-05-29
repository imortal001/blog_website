import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

const SaveIndicator = ({ status }) => {
  // Animation classes based on status
  const getAnimationClass = () => {
    if (status === 'saved') return 'animate-fade-in';
    if (status === 'saving') return 'animate-pulse';
    return 'opacity-0';
  };
  
  // Display message based on status
  const getMessage = () => {
    if (status === 'saved') return 'Saved';
    if (status === 'saving') return 'Saving...';
    return '';
  };
  
  return (
    <div className={`flex items-center text-sm transition-opacity duration-300 ${getAnimationClass()}`}>
      {status === 'saving' && (
        <Loader2 className="h-4 w-4 mr-1 text-gray-500 animate-spin" />
      )}
      {status === 'saved' && (
        <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
      )}
      <span className={status === 'saved' ? 'text-green-600' : 'text-gray-500'}>
        {getMessage()}
      </span>
    </div>
  );
};

export default SaveIndicator;