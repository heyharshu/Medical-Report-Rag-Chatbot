from langchain_community.vectorstores import Chroma
from app.services.embedding import embedding_model

DB_PATH = "app/chroma_db"


def retrieve_context(question: str):

    db = Chroma(
        persist_directory=DB_PATH,
        embedding_function=embedding_model
    )

    docs = db.similarity_search(
        question,
        k=4
    )

    context = ""

    for doc in docs:

        context += doc.page_content
        context += "\n\n"

    return context