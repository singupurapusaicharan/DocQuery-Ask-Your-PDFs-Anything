import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Skeleton } from '@/components/ui/skeleton';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

export const ChatInterface = ({ messages, onSendMessage, isLoading = false }: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [localLoading, setLocalLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    setLocalLoading(true);
    onSendMessage(content);
    
    // Reset local loading state after a short delay
    setTimeout(() => {
      setLocalLoading(false);
    }, 500);
  };

  // Use either the parent's loading state or the local one
  const showLoading = isLoading || localLoading;

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      <div className="flex-1 overflow-y-auto scroll-smooth pb-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-3 py-10 w-full">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MessageBubble message={message} />
              </div>
            ))}
            
            {showLoading && (
              <div className="mb-4 animate-fade-in">
                <div className="flex items-start">
                  <div className="w-8 h-8 flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">AI</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[180px]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-10 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};
