from fastapi import APIRouter, UploadFile, File
from app.services.pdf_loader import process_pdf
import os
import shutil

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):

    # Delete old uploaded PDFs
    if os.path.exists(UPLOAD_DIR):
        shutil.rmtree(UPLOAD_DIR)
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # This recreates the vector DB
    process_pdf(file_path)

    return {
        "message": "PDF uploaded and processed successfully"
    }