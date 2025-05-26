# PDF Quest Hub

A full-stack application for uploading PDFs, asking questions about their content, and generating summaries using AI. The system uses PostgreSQL for data storage, FastAPI for the backend, and React for the frontend.

## 🌟 Features

- **PDF Upload & Management**: Upload, view, and delete PDF documents
- **AI-Powered Question Answering**: Ask questions about PDF content and get accurate answers
- **Document Summarization**: Generate concise summaries of PDF documents
- **History Tracking**: Keep track of all questions asked and answers received
- **Modern UI**: Clean, responsive interface with dark mode support

## 🏗️ Project Structure

```
pdf-quest-hub/
├── backend/                 # FastAPI backend
│   ├── app/                 # Application code
│   │   ├── routers/         # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── config.py        # Configuration
│   │   ├── database.py      # Database models
│   │   └── main.py          # Application entry point
│   ├── uploads/             # PDF storage (not committed to Git)
│   ├── .env.example         # Example environment variables
│   └── requirements.txt     # Python dependencies
├── src/                     # React frontend
│   ├── components/          # UI components
│   ├── pages/               # Application pages
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── public/                  # Static assets
├── .env.example             # Example environment variables for frontend
└── package.json             # Node.js dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- PostgreSQL database
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory:
   ```bash
   cp .env.example .env
   ```

5. Edit the `.env` file with your PostgreSQL credentials and OpenAI API key:
   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=pdf_quest
   OPENAI_API_KEY=your_openai_api_key
   ```

6. Create the PostgreSQL database:
   ```bash
   createdb pdf_quest  # Or create it using pgAdmin or another PostgreSQL tool
   ```

7. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at http://localhost:8000 and the API documentation at http://localhost:8000/docs

### Frontend Setup

1. From the project root, install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file with your backend API URL:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:5173

## 🔒 Security Notes

- **Environment Variables**: All sensitive information (database credentials, API keys) should be stored in `.env` files, which are not committed to version control.
- **API Security**: The backend includes CORS configuration to restrict access to the API.
- **Database Security**: Use strong passwords and consider additional security measures like SSL connections for production deployments.

## 📚 API Endpoints

### Documents

- `POST /documents/upload`: Upload a PDF file
- `GET /documents/`: Get all documents
- `GET /documents/{document_id}`: Get a document by ID
- `DELETE /documents/{document_id}`: Delete a document

### Question Answering

- `POST /qa/ask`: Ask a question about a document
- `GET /qa/history/{document_id}`: Get the question-answer history for a document
- `POST /qa/summarize/{document_id}`: Generate a summary of a document

## 🧠 How It Works

1. **PDF Processing**: When a PDF is uploaded, the backend extracts the text using PyMuPDF and stores the file locally.
2. **Question Answering**: When a question is asked, the backend uses LangChain to:
   - Split the document into manageable chunks
   - Create embeddings using OpenAI's embedding model
   - Retrieve the most relevant chunks for the question
   - Generate an answer using OpenAI's language model
3. **Data Storage**: Document metadata and question-answer pairs are stored in PostgreSQL for future reference.

## 🛠️ Technologies Used

- **Backend**:
  - FastAPI: Modern, high-performance web framework
  - SQLAlchemy: SQL toolkit and ORM
  - LangChain: Framework for LLM applications
  - PyMuPDF: PDF processing library
  - PostgreSQL: Relational database

- **Frontend**:
  - React: UI library
  - Tailwind CSS: Utility-first CSS framework
  - Shadcn UI: Component library

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- OpenAI for providing the language models
- LangChain for the question-answering framework
- FastAPI for the backend framework
- React and Tailwind CSS for the frontend
