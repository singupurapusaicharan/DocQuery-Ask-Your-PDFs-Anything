import { useState, useEffect } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { Header } from '../components/Header';
import { uploadPdf, askQuestion, getDocuments } from '../lib/api';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Document {
  id: number;
  filename: string;
  file_path: string;
  upload_time: string;
}

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activeDocumentId, setActiveDocumentId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai' as const,
      content: "Hi! Upload a PDF document and ask me questions about it.",
      timestamp: new Date()
    }
  ]);

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const docs = await getDocuments();
      setDocuments(docs);
      
      // Set the active document to the most recent one if available
      if (docs.length > 0 && !activeDocumentId) {
        setActiveDocumentId(docs[0].id);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch documents. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (files: File[]) => {
    setIsLoading(true);
    
    try {
      for (const file of files) {
        const result = await uploadPdf(file);
        setUploadedFiles(prev => [...prev, file]);
        
        // Update documents list
        await fetchDocuments();
        
        // Set the active document to the newly uploaded one
        if (result.document && result.document.id) {
          setActiveDocumentId(result.document.id);
        }
        
        // Add a message about the uploaded file
        const newMessage: Message = {
          id: messages.length + 1,
          type: 'ai',
          content: `I've processed your document "${file.name}". You can now ask me questions about it.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeDocumentId) {
      toast({
        title: "No Document Selected",
        description: "Please upload a document first.",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    
    try {
      // Show a loading message
      const loadingId = messages.length + 2;
      const loadingMessage: Message = {
        id: loadingId,
        type: 'ai',
        content: "Thinking...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, loadingMessage]);
      
      // Get answer from API
      const result = await askQuestion(activeDocumentId, content);
      
      // Replace loading message with actual answer
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingId 
            ? { ...msg, content: result.answer } 
            : msg
        )
      );
    } catch (error) {
      console.error('Error asking question:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: "I'm sorry, I encountered an error while processing your question. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col overflow-hidden transition-colors duration-200">
      <Header onFileUpload={handleFileUpload} uploadedFiles={uploadedFiles} />
      <div className="flex-1 flex flex-col min-h-0">
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
