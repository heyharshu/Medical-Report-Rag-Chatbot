import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Home } from "@/components/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediWise" },
      {
        name: "description",
        content:
          "Upload your medical report and chat with an AI assistant that explains your results.",
      },
      { property: "og:title", content: "Medical Report Assistant" },
      {
        property: "og:description",
        content: "AI-powered chatbot for understanding your medical reports.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Home />
      <Toaster richColors position="top-right" />
    </>
  );
}
