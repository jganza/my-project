import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';

const MOCK_ANALYSIS = {
  faceShape: 'Oval',
  skinTone: 'Medium',
  undertone: 'Warm',
  features: ['Almond eyes', 'Full lips'],
  confidence: 94,
};

const MOCK_PRODUCTS = [
  {
    id: 'p1',
    brand: 'Fenty Beauty',
    name: "Pro Filt'r Soft Matte",
    shade: '290',
    type: 'Foundation',
    match: 98,
    price: '$42',
    buyUrl: 'https://example.com/fenty-pro-filtr',
  },
  {
    id: 'p2',
    brand: 'MAC',
    name: 'Velvet Teddy',
    shade: 'Warm Nude',
    type: 'Lipstick',
    match: 93,
    price: '$23',
    buyUrl: 'https://example.com/mac-velvet-teddy',
  },
];

const MOCK_HAIRSTYLES = [
  { id: 'h1', name: 'Soft Layers', fit: 'Oval + Wavy', match: 97 },
  { id: 'h2', name: 'Long Waves', fit: 'Oval + Wavy', match: 94 },
];

const TABS = ['home', 'analysis', 'makeup', 'hair', 'skincare', 'premium'];

export default function GlowGuideApp() {
  const [tab, setTab] = useState('home');
  const [concerns, setConcerns] = useState('Dryness, Uneven tone');
  const [isOffline, setIsOffline] = useState(false);

  const offlineLabel = useMemo(
    () => (isOffline ? 'Offline basics enabled' : 'Online AI mode enabled'),
    [isOffline],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>GlowGuide</Text>
        <Pressable onPress={() => setIsOffline((prev) => !prev)} style={styles.badgeButton}>
          <Text style={styles.badgeText}>{offlineLabel}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {tab === 'home' && <HomePanel concerns={concerns} setConcerns={setConcerns} />}
        {tab === 'analysis' && <AnalysisPanel />}
        {tab === 'makeup' && <MakeupPanel />}
        {tab === 'hair' && <HairPanel />}
        {tab === 'skincare' && <SkincarePanel concerns={concerns} isOffline={isOffline} />}
        {tab === 'premium' && <PremiumPanel />}
      </ScrollView>

      <View style={styles.nav}>
        {TABS.map((tabName) => (
          <Pressable key={tabName} onPress={() => setTab(tabName)} style={styles.navItem}>
            <Text style={[styles.navText, tab === tabName && styles.navTextActive]}>{tabName}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

function HomePanel({ concerns, setConcerns }) {
  return (
    <View style={styles.card}>
      <Text style={styles.h2}>Upload Selfie</Text>
      <Text style={styles.p}>Capture or upload a selfie for AI face shape, skin tone, and feature analysis.</Text>
      <View style={styles.buttonRow}>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Take Selfie</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Upload</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Skin concerns</Text>
      <TextInput value={concerns} onChangeText={setConcerns} style={styles.input} placeholder="Acne, dryness..." />

      <Text style={styles.label}>Hair texture</Text>
      <Text style={styles.p}>Straight • Wavy • Curly • Coily</Text>
    </View>
  );
}

function AnalysisPanel() {
  return (
    <View style={styles.card}>
      <Text style={styles.h2}>AI Analysis Results</Text>
      <Text style={styles.p}>Face Shape: {MOCK_ANALYSIS.faceShape}</Text>
      <Text style={styles.p}>Skin Tone: {MOCK_ANALYSIS.skinTone} ({MOCK_ANALYSIS.undertone})</Text>
      <Text style={styles.p}>Features: {MOCK_ANALYSIS.features.join(', ')}</Text>
      <Text style={styles.p}>Confidence: {MOCK_ANALYSIS.confidence}%</Text>
    </View>
  );
}

function MakeupPanel() {
  return (
    <View style={styles.card}>
      <Text style={styles.h2}>Personalized Makeup Recommendations</Text>
      <FlatList
        data={MOCK_PRODUCTS}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.productName}>{item.brand} · {item.name}</Text>
            <Text style={styles.p}>Shade: {item.shade} · Type: {item.type}</Text>
            <Text style={styles.p}>Match: {item.match}% · Price: {item.price}</Text>
            <Text style={styles.link}>Buy: {item.buyUrl}</Text>
            <View style={styles.buttonRow}>
              <Pressable style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>AR Try-On</Text></Pressable>
              <Pressable style={styles.primaryButton}><Text style={styles.primaryButtonText}>Open Link</Text></Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

function HairPanel() {
  return (
    <View style={styles.card}>
      <Text style={styles.h2}>Hairstyles by Face Shape + Texture</Text>
      {MOCK_HAIRSTYLES.map((style) => (
        <View key={style.id} style={styles.listItem}>
          <Text style={styles.productName}>{style.name}</Text>
          <Text style={styles.p}>{style.fit} · Match {style.match}%</Text>
          <Pressable style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>AR Preview</Text></Pressable>
        </View>
      ))}
    </View>
  );
}

function SkincarePanel({ concerns, isOffline }) {
  return (
    <View style={styles.card}>
      <Text style={styles.h2}>Skincare Routine Generator</Text>
      <Text style={styles.p}>Concerns: {concerns}</Text>
      <Text style={styles.p}>AM: Cleanser → Vitamin C → Moisturizer → SPF</Text>
      <Text style={styles.p}>PM: Cleanser → Retinoid → Moisturizer</Text>
      <Text style={styles.p}>{isOffline ? 'Using saved offline routine snapshot.' : 'Syncing latest routine from cloud model.'}</Text>
    </View>
  );
}

function PremiumPanel() {
  return (
    <View style={styles.card}>
      <Text style={styles.h2}>GlowGuide Premium</Text>
      <Text style={styles.p}>• Unlimited analyses</Text>
      <Text style={styles.p}>• Advanced recommendation accuracy model</Text>
      <Text style={styles.p}>• Full AR makeup + hair try-on</Text>
      <Text style={styles.p}>• Premium-only trend packs</Text>
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Start 7-Day Trial</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F7' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#5B3A43' },
  badgeButton: { backgroundColor: '#F3E4E7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  badgeText: { fontSize: 11, color: '#815963', fontWeight: '600' },
  container: { padding: 16, paddingBottom: 100, gap: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, gap: 8 },
  h2: { fontSize: 18, fontWeight: '700', color: '#4A2D35' },
  p: { fontSize: 14, color: '#6D4B54' },
  label: { marginTop: 8, fontSize: 13, fontWeight: '600', color: '#6D4B54' },
  input: { borderWidth: 1, borderColor: '#E7D3D8', borderRadius: 12, padding: 10, backgroundColor: '#FFF' },
  buttonRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  primaryButton: { backgroundColor: '#E2AAB3', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
  primaryButtonText: { color: '#FFF', fontWeight: '700' },
  secondaryButton: { borderWidth: 1, borderColor: '#E2AAB3', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
  secondaryButtonText: { color: '#A06974', fontWeight: '700' },
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0DCE1',
    backgroundColor: '#FFFFFF',
  },
  navItem: { padding: 4 },
  navText: { color: '#98707A', fontSize: 12, textTransform: 'capitalize' },
  navTextActive: { color: '#5B3A43', fontWeight: '700' },
  separator: { height: 1, backgroundColor: '#F3E4E7', marginVertical: 10 },
  productName: { fontSize: 15, fontWeight: '700', color: '#4A2D35' },
  link: { fontSize: 12, color: '#7B68EE' },
  listItem: { paddingVertical: 8, gap: 6 },
});
