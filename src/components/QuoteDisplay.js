import React from 'react';
import { Copy } from 'lucide-react';

const QuoteDisplay = ({ quote, onCopy }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg relative">
      <p className="text-lg italic text-center">{quote}</p>
      <button 
        onClick={onCopy}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Copy quote"
      >
        <Copy size={20} />
      </button>
    </div>
  );
};

export default QuoteDisplay;

