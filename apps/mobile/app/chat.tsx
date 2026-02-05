import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

const messages = [
  {
    role: "assistant",
    content:
      "Scripture calls us to trust the Lord in both joy and sorrow. Hold fast to the promise of His presence, and let wisdom guide each step.",
    citations: ["John 3:16 (WEB)", "Psalm 23:1-4 (WEB)"]
  }
];

export default function ChatScreen() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text style={{ color: "#f8fafc", fontSize: 22, fontWeight: "600" }}>Chat with ADONAI</Text>
      <Text style={{ color: "#94a3b8", fontSize: 13 }}>
        Verbatim quotes only appear when retrieved from the stored Bible dataset.
      </Text>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 12 }}>
        {messages.map((message, index) => (
          <View key={index} style={{ backgroundColor: "#0f172a", padding: 12, borderRadius: 12 }}>
            <Text style={{ color: "#e2e8f0", fontSize: 13 }}>{message.content}</Text>
            {message.citations ? (
              <Text style={{ color: "#94a3b8", fontSize: 11, marginTop: 6 }}>
                {message.citations.join(", ")}
              </Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          placeholder="Share what you're facing..."
          placeholderTextColor="#64748b"
          style={{ flex: 1, backgroundColor: "#0f172a", color: "#f8fafc", padding: 12, borderRadius: 8 }}
        />
        <TouchableOpacity style={{ backgroundColor: "#f8fafc", padding: 12, borderRadius: 8 }}>
          <Text style={{ color: "#0f172a", fontWeight: "600" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
