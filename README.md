# 🩺 MediWise

An AI-powered **Medical Report Chatbot** built using **Retrieval-Augmented Generation (RAG)** that enables users to upload medical reports (PDFs) and ask questions in natural language. The chatbot retrieves relevant information from the report and generates accurate, context-aware answers using a Large Language Model (LLM).

---

## ✨ Features

* 📄 Upload medical reports in PDF format
* 🤖 AI-powered question answering
* 🔍 Retrieval-Augmented Generation (RAG)
* 🧠 Context-aware responses from uploaded reports
* ⚡ Fast semantic search using vector embeddings
* 💬 Supports English and Hindi conversations
* 🌐 Optional web search fallback for general medical queries
* 📱 Modern and responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* TanStack Router
* ShadCN UI

### Backend

* FastAPI
* Python
* LangChain
* Google Gemini / OpenAI
* ChromaDB
* PyPDF

### Database & Authentication

* Vector DB
* PostgreSQL

---

## 🏗️ Architecture

```text
                  User
                    │
                    ▼
          Upload Medical Report
                    │
                    ▼
          PDF Parsing & Chunking
                    │
                    ▼
          Generate Embeddings
                    │
                    ▼
          Store in Vector Database
                    │
                    ▼
            Similarity Search
                    │
                    ▼
        Large Language Model (LLM)
                    │
                    ▼
         Context-Aware Response
```

---

## 🚀 How It Works

1. User uploads a medical report in PDF format.
2. The report is split into smaller chunks.
3. Each chunk is converted into vector embeddings.
4. Embeddings are stored in the vector database.
5. When a question is asked, relevant chunks are retrieved.
6. The retrieved context is sent to the LLM.
7. The chatbot generates an accurate answer based on the report.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/heyharshu/medical-report-rag-chatbot.git

cd medical-report-rag-chatbot
```

---

## 2. Create Virtual Environment

### Windows

```bash
python -m venv .venv

.venv\Scripts\activate
```

### Linux/macOS

```bash
python3 -m venv .venv

source .venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Create Environment Variables

Create a `.env` file in the root directory.

```env
GEMINI_API_KEY=your_gemini_api_key

```

Add any additional environment variables required by your application.

---

## 5. Run the Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

API Documentation:

```
http://localhost:8000/docs
```

---

## 6. Run the Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

or

```
http://localhost:3000
```

depending on your setup.

---

## 📂 Project Structure

```text
medical-report-rag-chatbot/

├── medical-rag backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── models/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── chroma_db/
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── medical-rag frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── LICENSE
```

---

## 💬 Example Questions

* What is my blood sugar level?
* Summarize my medical report.
* What medicines have been prescribed?
* Is my cholesterol level normal?
* What abnormalities are present in the report?
* Explain my CBC report in simple language.

---

## 🎯 Future Improvements

* 📑 Multiple PDF support
* 🖼️ OCR support for scanned reports
* 🎙️ Voice-based chatbot
* 📈 Health trend analysis
* 👨‍⚕️ Doctor recommendation system
* 💊 Medicine explanation and dosage information
* 📊 Patient health dashboard
* ☁️ Cloud deployment with Docker

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub.

It motivates further development and helps others discover the project.

---

## 👨‍💻 Author

**Harsh Gupta**

B.Tech CSE (AI & ML)

Passionate about Generative AI, LLMs, RAG Systems, FastAPI, React, and Machine Learning.

---

<p align="center">
Built with ❤️ using FastAPI, LangChain, ChromaDB, Gemini, and Retrieval-Augmented Generation (RAG).
</p>
