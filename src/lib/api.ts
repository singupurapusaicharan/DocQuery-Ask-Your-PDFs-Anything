/**
 * API client for communicating with the backend
 */

// Get the API URL from environment variables or use a default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Upload a PDF file to the server
 * @param file The PDF file to upload
 * @returns The uploaded document data
 */
export async function uploadPdf(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/documents/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to upload PDF');
  }

  return response.json();
}

/**
 * Get all uploaded documents
 * @returns List of documents
 */
export async function getDocuments() {
  const response = await fetch(`${API_URL}/documents/`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to get documents');
  }

  return response.json();
}

/**
 * Ask a question about a document
 * @param documentId The ID of the document
 * @param question The question to ask
 * @returns The answer and related information
 */
export async function askQuestion(documentId: number, question: string) {
  const response = await fetch(`${API_URL}/qa/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document_id: documentId,
      question,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to get answer');
  }

  return response.json();
}

/**
 * Get the question-answer history for a document
 * @param documentId The ID of the document
 * @returns List of question-answer pairs
 */
export async function getQaHistory(documentId: number) {
  const response = await fetch(`${API_URL}/qa/history/${documentId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to get QA history');
  }

  return response.json();
}

/**
 * Generate a summary of a document
 * @param documentId The ID of the document
 * @returns The summary of the document
 */
export async function summarizeDocument(documentId: number) {
  const response = await fetch(`${API_URL}/qa/summarize/${documentId}`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to generate summary');
  }

  return response.json();
}
