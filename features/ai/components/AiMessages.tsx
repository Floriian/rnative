import { Text, View } from "react-native";
import { AiMessageResponse } from "../types";

interface Props {
  messages: AiMessageResponse[];
}

export function AiMessages({ messages } : Props) {
  return (
    <View>
      {messages.map((message) => (
        <View key={message.id} style={{ marginBottom: 8 }}>
          <View>
            <Text>{message.role}</Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text>{message.content}</Text>
          </View>
        </View>
      ))}
      <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 8 }} />
      <View style={{ height: 8 }} />
    </View>
  );
}