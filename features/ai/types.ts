export interface AiMessageResponse {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export interface AiMessageRequest {
  content: string;
}
