import os
import shutil
import gc

from langchain_community.vectorstores import Chroma
from app.services.embedding import embedding_model

DB_PATH = "app/chroma_db"

def save_to_vectordb(chunks):

    # Force garbage collection
    gc.collect()

    # Remove old database if it exists
    if os.path.exists(DB_PATH):
        try:
            shutil.rmtree(DB_PATH)
        except PermissionError:
            print("⚠️ Chroma DB is in use. Please ensure no old Chroma instance is alive.")
            raise

    os.makedirs(DB_PATH, exist_ok=True)

    # Create new vector database
    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=DB_PATH,
    )

    vectordb.persist()

    # Release file handles
    del vectordb
    gc.collect()

    print(f"✅ Stored {len(chunks)} chunks successfully")