import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 120000,
});

export async function uploadPDF(file: File): Promise<{ message: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function sendQuestion(
  question: string,
): Promise<{ question: string; answer: string }> {
  const { data } = await api.post("/chat/", { question });
  return data;
}
