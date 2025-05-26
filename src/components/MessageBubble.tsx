import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="w-8 h-8 flex-shrink-0 mr-3">
          {message.type === 'user' ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">S</span>
            </div>
          ) : (
            <div className="w-8 h-8 relative flex-shrink-0">
              {/* Base container */}
              <div className="w-8 h-8 rounded-full"></div>
              
              {/* Green outer strip */}
              <div className="absolute inset-0 rounded-full border-[2px] border-[#00B86B]"></div>
              
              {/* White middle strip */}
              <div className="absolute top-[2px] left-[2px] right-[2px] bottom-[2px] rounded-full border-[2px] border-white dark:border-white"></div>
              
              {/* Green inner circle with ai text */}
              <div className="absolute top-[4px] left-[4px] right-[4px] bottom-[4px] bg-[#00B86B] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">ai</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1">
          {message.type === 'user' ? (
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              <ReactMarkdown components={{
                h1: ({node, ...props}) => <h1 className="text-xl font-bold my-3" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-bold my-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-base font-bold my-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
                li: ({node, ...props}) => <li className="my-1" {...props} />,
                p: ({node, ...props}) => <p className="my-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" {...props} />
              }}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
