import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isSending && !disabled) {
      setIsSending(true);
      onSendMessage(inputValue);
      setInputValue('');
      
      // Reset sending state
      setTimeout(() => {
        setIsSending(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Send a message..."
          className="w-full resize-none border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pr-12 pl-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 text-sm min-h-[44px]"
          rows={1}
          disabled={isSending || disabled}
          aria-label="Type your message"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isSending || disabled}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent disabled:opacity-50 text-gray-700 dark:text-gray-300 rounded-full p-2 flex items-center justify-center transition-colors"
          aria-label="Send message"
        >
          {isSending ? (
            <div className="w-4 h-4 border-2 border-gray-500 dark:border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  );
};
