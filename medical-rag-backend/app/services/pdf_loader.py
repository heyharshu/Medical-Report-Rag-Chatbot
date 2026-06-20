from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.services.vectordb import save_to_vectordb


def process_pdf(file_path):

    loader = PyPDFLoader(file_path)

    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(docs)

    print(f"Total Chunks: {len(chunks)}")

    save_to_vectordb(chunks)

    return True