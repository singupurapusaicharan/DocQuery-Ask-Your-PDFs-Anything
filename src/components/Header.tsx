import { Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { AiPlanetLogo } from './AiPlanetLogo';
import { ThemeToggle } from './ThemeToggle';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onFileUpload: (files: File[]) => void;
  uploadedFiles: File[];
}

export const Header = ({ onFileUpload, uploadedFiles }: HeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length > 0) {
      setIsUploading(true);
      
      toast({
        title: "Uploading PDF",
        description: "Please wait while we process your document...",
      });
      
      // Simulate upload delay for smooth UX
      setTimeout(() => {
        onFileUpload(pdfFiles);
        setIsUploading(false);
        toast({
          title: "Upload Complete",
          description: "Your PDF has been successfully uploaded!",
        });
      }, 1000);
    } else if (files.length > 0) {
      toast({
        title: "Invalid File Type",
        description: "Please upload only PDF files.",
        variant: "destructive",
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 sticky top-0 z-50 transition-colors duration-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="hidden sm:block">
          <AiPlanetLogo size="lg" />
        </div>
        <div className="block sm:hidden">
          <AiPlanetLogo size="md" showText={false} />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {uploadedFiles.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
              {uploadedFiles.map((file, index) => (
                <span 
                  key={`${file.name}-${index}`}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs transition-all duration-200 hover:bg-blue-200 dark:hover:bg-blue-800"
                  title={file.name}
                >
                  {file.name.length > 20 ? `${file.name.substring(0, 17)}...` : file.name}
                </span>
              ))}
            </div>
          )}
          
          <Button
            onClick={handleUploadClick}
            variant="outline"
            disabled={isUploading}
            className="flex items-center justify-center gap-1 sm:gap-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-auto transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            aria-label="Upload PDF document"
          >
            {isUploading ? (
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-600 dark:border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Plus className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                </div>
                <span className="hidden sm:inline">Upload PDF</span>
              </>
            )}
          </Button>
          
          <ThemeToggle />
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </div>
      </div>
    </header>
  );
};
