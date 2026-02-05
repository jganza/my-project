import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text style={{ color: "#f8fafc", fontSize: 24, fontWeight: "600" }}>Sign in to ADONAI.AI</Text>
      <Text style={{ color: "#94a3b8", fontSize: 14 }}>
        Authentication is required before chat. Use email/password or OAuth through Supabase.
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#64748b"
        style={{ backgroundColor: "#0f172a", color: "#f8fafc", padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#64748b"
        secureTextEntry
        style={{ backgroundColor: "#0f172a", color: "#f8fafc", padding: 12, borderRadius: 8 }}
      />
      <TouchableOpacity style={{ backgroundColor: "#f8fafc", padding: 12, borderRadius: 8 }}>
        <Text style={{ textAlign: "center", color: "#0f172a", fontWeight: "600" }}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ borderColor: "#334155", borderWidth: 1, padding: 12, borderRadius: 8 }}>
        <Text style={{ textAlign: "center", color: "#f8fafc" }}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ borderColor: "#334155", borderWidth: 1, padding: 12, borderRadius: 8 }}>
        <Text style={{ textAlign: "center", color: "#f8fafc" }}>Continue with Apple</Text>
      </TouchableOpacity>
    </View>
  );
}
