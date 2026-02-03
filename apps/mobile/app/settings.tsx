import { View, Text, Switch } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text style={{ color: "#f8fafc", fontSize: 22, fontWeight: "600" }}>Settings</Text>
      <View style={{ backgroundColor: "#0f172a", padding: 12, borderRadius: 12, gap: 8 }}>
        <Text style={{ color: "#f8fafc", fontWeight: "600" }}>Translation</Text>
        <Text style={{ color: "#94a3b8", fontSize: 12 }}>WEB (default)</Text>
        <Text style={{ color: "#64748b", fontSize: 12 }}>
          Additional translations can be enabled once licensed.
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#0f172a",
          padding: 12,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View>
          <Text style={{ color: "#f8fafc", fontWeight: "600" }}>Quote verses verbatim</Text>
          <Text style={{ color: "#94a3b8", fontSize: 12 }}>Only from stored Bible data.</Text>
        </View>
        <Switch value />
      </View>
    </View>
  );
}
