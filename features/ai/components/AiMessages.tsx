import { Text, View } from "react-native";
import { AiMessageResponse } from "../types";

interface Props {
  messages: AiMessageResponse[];
}
export function AiMessages({ messages }: Props) {
  return (
    <View>
      {messages.map((message) => (
        <View
          key={message.id}
          style={{
            marginBottom: 8,
            flexDirection: "row",
            justifyContent: message.role === "user" ? "flex-end" : "flex-start",
            width: "100%",
          }}
        >
          <View
            style={{
              maxWidth: "80%",
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: message.role === "user" ? "#DCF8C6" : "#ECECEC",
              padding: 10,
              borderRadius: 8,
              marginLeft: message.role === "user" ? 0 : 8,
              marginRight: message.role === "user" ? 8 : 0,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{message.role}</Text>
            <View style={{ marginTop: 4 }}>
              <Text>{message.content}</Text>
            </View>
          </View>
        </View>
      ))}
      <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 8 }} />
      <View style={{ height: 8 }} />
    </View>
  );
}
