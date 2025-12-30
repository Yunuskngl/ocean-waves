import React from 'react';

interface ShortLoadingScreenProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'overlay' | 'inline' | 'fullscreen';
}

const ShortLoadingScreen: React.FC<ShortLoadingScreenProps> = ({ 
  message = "Loading...", 
  size = 'md',
  variant = 'overlay'
}) => {
  const logoSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const ringSizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-28 h-28'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`relative flex items-center justify-center ${ringSizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full bg-[#e23e3e]/8 blur-md" />
        <div className="absolute inset-[12%] rounded-full border border-[#e23e3e]/22" />
        <div className="absolute inset-[12%] rounded-full border-[3px] border-transparent border-t-[#e23e3e] border-r-[#f18989]/90 animate-[spin_1.1s_linear_infinite]" />
        <div className="absolute inset-[23%] rounded-full border border-[#e23e3e]/14 animate-[spin_2.4s_linear_infinite]" />
        <div className="relative z-10 flex items-center justify-center">
        </div>
      </div>
      <p className={`${textSizeClasses[size]} text-[#6b1c1c] font-medium animate-pulse`}>
        {message}
      </p>
    </div>
  );

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-[60] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <LoadingContent />
        </div>
      </div>
    );
  }

  if (variant === 'overlay') {
    return (
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-40 flex items-center justify-center rounded-lg">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <LoadingContent />
        </div>
      </div>
    );
  }

  // inline variant
  return (
    <div className="flex items-center justify-center p-4">
      <LoadingContent />
    </div>
  );
};

export default ShortLoadingScreen;
