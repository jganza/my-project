import { View, Text, TouchableOpacity } from "react-native";

const saved = [
  {
    reference: "Psalm 23:1-6",
    translation: "WEB",
    note: "Strength for anxious days"
  }
];

export default function SavedScreen() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text style={{ color: "#f8fafc", fontSize: 22, fontWeight: "600" }}>Saved Scriptures</Text>
      <Text style={{ color: "#94a3b8", fontSize: 13 }}>Bookmarks you can return to anytime.</Text>
      {saved.map((item) => (
        <View key={item.reference} style={{ backgroundColor: "#0f172a", padding: 12, borderRadius: 12 }}>
          <Text style={{ color: "#f8fafc", fontWeight: "600" }}>{item.reference}</Text>
          <Text style={{ color: "#94a3b8", fontSize: 12 }}>{item.translation}</Text>
          <Text style={{ color: "#94a3b8", fontSize: 12, marginTop: 6 }}>{item.note}</Text>
        </View>
      ))}
      <TouchableOpacity style={{ borderColor: "#334155", borderWidth: 1, padding: 12, borderRadius: 8 }}>
        <Text style={{ textAlign: "center", color: "#f8fafc" }}>Add scripture</Text>
      </TouchableOpacity>
    </View>
  );
}
