import { View, Text, TouchableOpacity } from "react-native";

const entries = [
  {
    title: "Morning prayer",
    excerpt: "Lord, give me wisdom for the decisions ahead..."
  }
];

export default function JournalScreen() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text style={{ color: "#f8fafc", fontSize: 22, fontWeight: "600" }}>Prayer & Journal</Text>
      <Text style={{ color: "#94a3b8", fontSize: 13 }}>
        Your private reflections and prayers are stored securely.
      </Text>
      {entries.map((entry) => (
        <View key={entry.title} style={{ backgroundColor: "#0f172a", padding: 12, borderRadius: 12 }}>
          <Text style={{ color: "#f8fafc", fontWeight: "600" }}>{entry.title}</Text>
          <Text style={{ color: "#94a3b8", fontSize: 12, marginTop: 6 }}>{entry.excerpt}</Text>
        </View>
      ))}
      <TouchableOpacity style={{ backgroundColor: "#f8fafc", padding: 12, borderRadius: 8 }}>
        <Text style={{ textAlign: "center", color: "#0f172a", fontWeight: "600" }}>New entry</Text>
      </TouchableOpacity>
    </View>
  );
}
