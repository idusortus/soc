import { useState } from 'react';

interface EventCodeDisplayProps {
  eventCode: string;
  shareURL: string;
}

export function EventCodeDisplay({ eventCode, shareURL }: EventCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = shareURL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Soc Ops game!',
          text: `Use code: ${eventCode}`,
          url: shareURL,
        });
      } catch {
        // User cancelled or share failed, fallback to copy
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Event Code</p>
          <p className="text-2xl font-bold text-gray-800 tracking-wider">{eventCode}</p>
        </div>
        <button
          onClick={handleShare}
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-light transition-colors text-sm font-medium"
        >
          {copied ? '✓ Copied!' : 'Share'}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Share this code with others to join the same event
      </p>
    </div>
  );
}
