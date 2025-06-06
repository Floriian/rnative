/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useApi } from "../../hooks/use-api";
import { AiMessageRequest, AiMessageResponse } from "./types";

export const useAi = () => {
  const { get, post } = useApi();

  const getMessages = useCallback(async () => {
    const { data } = await get<AiMessageResponse[]>("/");
    return data;
  }, [])

  const createMessage = useCallback(
    async (message: string) => {
      const { data } = await post<
        AiMessageRequest,
        AxiosResponse<AiMessageResponse[]>,
        AiMessageRequest
      >("/", {
        content: message,
      });

      return data;
    },
    []
  );

  return {
    getMessages,
    createMessage,
  };
};
