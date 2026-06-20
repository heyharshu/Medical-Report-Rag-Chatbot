from fastapi import APIRouter

from app.models.request import ChatRequest

from app.services.retriever import retrieve_context

from app.services.gemini import ask_gemini

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/")

async def chat(data: ChatRequest):

    context = retrieve_context(
        data.question
    )

    answer = ask_gemini(
        context,
        data.question
    )

    return {
        "question": data.question,
        "answer": answer
    }