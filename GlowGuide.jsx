import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, ChevronRight, Home, Search, Droplets, User, X, Check, ShoppingBag, Wand2, Scissors, Sun, Moon, Heart, Star, ArrowLeft, Share2, Zap, Crown, Gift, Play, RotateCcw } from 'lucide-react';

const colors = { primary: '#E8B4B8', primaryDark: '#D4919A', secondary: '#F5E6E8', gold: '#D4AF37', cream: '#FFF9F5', text: '#4A3F3F', textLight: '#8B7E7E', white: '#FFFFFF', gradient1: '#F8E1E4', gradient2: '#E8C4C8' };

const mockUserData = { name: 'Sarah', faceShape: 'Oval', skinTone: 'Medium', undertone: 'Warm', eyeShape: 'Almond', lipShape: 'Full', skinType: 'Combination', concerns: ['Fine Lines', 'Dryness', 'Uneven Tone'] };

const products = {
  foundations: [
    { id: 1, brand: 'Fenty Beauty', name: "Pro Filt'r Soft Matte", shade: '290', match: 98, price: 42, image: '🧴' },
    { id: 2, brand: 'MAC', name: 'Studio Fix Fluid', shade: 'NC35', match: 94, price: 40, image: '🧴' },
    { id: 3, brand: 'NARS', name: 'Radiant Longwear', shade: 'Barcelona', match: 91, price: 49, image: '🧴' },
    { id: 4, brand: 'Maybelline', name: 'Fit Me Dewy', shade: '228', match: 88, price: 8, image: '🧴' },
  ],
  lipsticks: [
    { id: 5, brand: 'Charlotte Tilbury', name: 'Pillow Talk', shade: 'Original', match: 96, price: 34, image: '💄' },
    { id: 6, brand: 'MAC', name: 'Matte Lipstick', shade: 'Velvet Teddy', match: 93, price: 23, image: '💄' },
  ],
  eyeshadows: [
    { id: 8, brand: 'Natasha Denona', name: 'Biba Palette', shade: 'Neutral', match: 95, price: 129, image: '🎨' },
  ],
};

const hairstyles = [
  { id: 1, name: 'Soft Layers', description: 'Face-framing layers that complement oval faces', image: '💇‍♀️', match: 97 },
  { id: 2, name: 'Beach Waves', description: 'Effortless waves for a relaxed, glamorous look', image: '🌊', match: 94 },
  { id: 3, name: 'Sleek Bob', description: 'Classic chin-length bob with subtle angles', image: '✂️', match: 91 },
];

const skincareRoutine = {
  morning: [
    { step: 1, type: 'Cleanser', product: 'CeraVe Hydrating Cleanser', icon: '🧼', time: '60s' },
    { step: 2, type: 'Serum', product: 'The Ordinary Niacinamide 10%', icon: '✨', time: '60s' },
    { step: 3, type: 'Moisturizer', product: 'Neutrogena Hydro Boost', icon: '🧴', time: '30s' },
    { step: 4, type: 'SPF', product: 'La Roche-Posay Anthelios', icon: '☀️', time: '60s' },
  ],
  evening: [
    { step: 1, type: 'Oil Cleanser', product: 'DHC Deep Cleansing Oil', icon: '🫧', time: '60s' },
    { step: 2, type: 'Cleanser', product: 'CeraVe Hydrating Cleanser', icon: '🧼', time: '60s' },
    { step: 3, type: 'Treatment', product: 'Differin Gel 0.1%', icon: '💊', time: '30s' },
    { step: 4, type: 'Night Cream', product: 'First Aid Beauty Ultra Repair', icon: '🌙', time: '60s' },
  ],
};

// Splash Screen
const SplashScreen = ({ onComplete }) => {
  useEffect(() => { const timer = setTimeout(onComplete, 2500); return () => clearTimeout(timer); }, [onComplete]);
  return (
    <div style={{ height: '100vh', background: `linear-gradient(145deg, ${colors.cream} 0%, ${colors.gradient1} 50%, ${colors.gradient2} 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '120px', height: '120px', borderRadius: '35px', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(232, 180, 184, 0.4)', marginBottom: '20px' }}>
        <Sparkles size={56} color={colors.white} strokeWidth={1.5} />
      </div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '42px', fontWeight: '300', color: colors.text, letterSpacing: '8px' }}>GLOW</h1>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', fontWeight: '600', color: colors.primaryDark, letterSpacing: '12px' }}>GUIDE</h2>
      <p style={{ marginTop: '24px', color: colors.textLight, fontSize: '14px', letterSpacing: '3px' }}>YOUR AI BEAUTY ADVISOR</p>
    </div>
  );
};

// Onboarding
const OnboardingScreen = ({ onComplete }) => {
  const [slide, setSlide] = useState(0);
  const slides = [
    { icon: <Camera size={64} color={colors.primary} strokeWidth={1.2} />, title: 'Discover Your Perfect Shades', desc: 'Our AI analyzes your unique features to find makeup that truly complements you' },
    { icon: <Wand2 size={64} color={colors.primary} strokeWidth={1.2} />, title: 'Virtual Try-On', desc: 'See how products look on you before buying with our AR technology' },
    { icon: <Droplets size={64} color={colors.primary} strokeWidth={1.2} />, title: 'Custom Skincare', desc: 'Get personalized routines based on your skin type and concerns' },
  ];
  return (
    <div style={{ height: '100vh', background: colors.cream, display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <button onClick={onComplete} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: colors.textLight, cursor: 'pointer' }}>Skip</button>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(232, 180, 184, 0.2)', marginBottom: '40px' }}>{slides[slide].icon}</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: colors.text, marginBottom: '16px' }}>{slides[slide].title}</h2>
        <p style={{ color: colors.textLight, fontSize: '16px', maxWidth: '280px' }}>{slides[slide].desc}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
        {slides.map((_, i) => <div key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? '24px' : '8px', height: '8px', borderRadius: '4px', background: slide === i ? colors.primary : colors.secondary, cursor: 'pointer', transition: 'all 0.3s' }} />)}
      </div>
      <button onClick={() => slide < slides.length - 1 ? setSlide(slide + 1) : onComplete()} style={{ padding: '18px', borderRadius: '16px', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, border: 'none', color: colors.white, fontSize: '16px', fontWeight: '500', cursor: 'pointer' }}>
        {slide < slides.length - 1 ? 'Next' : 'Get Started'}
      </button>
    </div>
  );
};

// Bottom Nav
const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [{ id: 'home', icon: Home, label: 'Home' }, { id: 'explore', icon: Search, label: 'Explore' }, { id: 'skincare', icon: Droplets, label: 'Skin' }, { id: 'profile', icon: User, label: 'Profile' }];
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px', background: colors.white, borderTop: `1px solid ${colors.secondary}`, display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)' }}>
      {tabs.map(({ id, icon: Icon, label }) => (
        <button key={id} onClick={() => setActiveTab(id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: activeTab === id ? colors.secondary : 'transparent', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '12px' }}>
          <Icon size={22} color={activeTab === id ? colors.primaryDark : colors.textLight} strokeWidth={activeTab === id ? 2 : 1.5} />
          <span style={{ fontSize: '11px', color: activeTab === id ? colors.primaryDark : colors.textLight, fontWeight: activeTab === id ? '600' : '400' }}>{label}</span>
        </button>
      ))}
    </div>
  );
};

// Home Screen
const HomeScreen = ({ userData, setCurrentScreen }) => (
  <div style={{ minHeight: '100vh', background: colors.cream, paddingBottom: '100px' }}>
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <p style={{ color: colors.textLight, fontSize: '14px' }}>Good morning ✨</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: colors.text }}>{userData.name}</h1>
      </div>
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
    </div>
    <div style={{ padding: '0 20px', marginBottom: '30px' }}>
      <button onClick={() => setCurrentScreen('camera')} style={{ width: '100%', padding: '30px', borderRadius: '24px', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, border: 'none', cursor: 'pointer', textAlign: 'left', boxShadow: '0 20px 60px rgba(232, 180, 184, 0.4)' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><Camera size={28} color={colors.white} /></div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', color: colors.white, marginBottom: '8px' }}>New Analysis</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Take a selfie & get personalized recommendations</p>
      </button>
    </div>
    <div style={{ padding: '0 20px', marginBottom: '30px' }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: colors.text, marginBottom: '16px' }}>Your Profile</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {[{ label: 'Face Shape', value: userData.faceShape, icon: '💎' }, { label: 'Skin Tone', value: `${userData.skinTone} ${userData.undertone}`, icon: '🎨' }, { label: 'Eye Shape', value: userData.eyeShape, icon: '👁️' }, { label: 'Skin Type', value: userData.skinType, icon: '💧' }].map((item) => (
          <div key={item.label} style={{ background: colors.white, padding: '16px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <p style={{ color: colors.textLight, fontSize: '12px', marginTop: '8px' }}>{item.label}</p>
            <p style={{ color: colors.text, fontSize: '14px', fontWeight: '500' }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
    <div style={{ marginBottom: '30px' }}>
      <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: colors.text }}>Recommended for You</h3>
        <button style={{ background: 'none', border: 'none', color: colors.primary, cursor: 'pointer' }}>See all</button>
      </div>
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '0 20px' }}>
        {products.foundations.slice(0, 3).map((product) => (
          <div key={product.id} onClick={() => setCurrentScreen('products')} style={{ minWidth: '140px', background: colors.white, borderRadius: '16px', padding: '16px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '100%', height: '80px', borderRadius: '12px', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '12px' }}>{product.image}</div>
            <p style={{ color: colors.textLight, fontSize: '11px' }}>{product.brand}</p>
            <p style={{ color: colors.text, fontSize: '13px', fontWeight: '500', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ background: colors.secondary, padding: '4px 8px', borderRadius: '8px', fontSize: '11px', color: colors.primaryDark, fontWeight: '500' }}>{product.match}%</span>
              <span style={{ color: colors.text, fontSize: '14px', fontWeight: '600' }}>${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ padding: '0 20px' }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: colors.text, marginBottom: '16px' }}>Quick Actions</h3>
      {[{ icon: <Wand2 size={20} />, label: 'Try AR Makeup', desc: 'Virtual try-on', screen: 'ar' }, { icon: <Scissors size={20} />, label: 'Hairstyle Match', desc: 'Find your perfect cut', screen: 'hairstyles' }, { icon: <Droplets size={20} />, label: 'Build Routine', desc: 'Personalized skincare', screen: 'skincare' }].map((action) => (
        <button key={action.label} onClick={() => setCurrentScreen(action.screen)} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: colors.white, borderRadius: '16px', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', marginBottom: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primaryDark }}>{action.icon}</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: colors.text, fontSize: '15px', fontWeight: '500' }}>{action.label}</p>
            <p style={{ color: colors.textLight, fontSize: '13px' }}>{action.desc}</p>
          </div>
          <ChevronRight size={20} color={colors.textLight} />
        </button>
      ))}
    </div>
  </div>
);

// Camera Screen
const CameraScreen = ({ onBack, onAnalyze }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const handleCapture = () => { setIsCapturing(true); setTimeout(onAnalyze, 1500); };
  return (
    <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowLeft size={20} color={colors.white} /></button>
        <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Zap size={20} color={colors.white} /></button>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '240px', height: '320px', border: `3px dashed ${isCapturing ? colors.primary : 'rgba(255,255,255,0.4)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isCapturing && <div style={{ width: '60px', height: '60px', border: `3px solid ${colors.primary}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />}
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px', color: colors.white }}>
        <p style={{ fontSize: '16px' }}>{isCapturing ? 'Analyzing your features...' : 'Position your face in the oval'}</p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{isCapturing ? 'Detecting 468 facial landmarks' : 'Good lighting recommended'}</p>
      </div>
      <div style={{ padding: '20px 20px 40px', display: 'flex', justifyContent: 'center', gap: '30px', alignItems: 'center' }}>
        <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '14px', padding: '12px 16px', color: colors.white, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>🖼️ Gallery</button>
        <button onClick={handleCapture} disabled={isCapturing} style={{ width: '80px', height: '80px', borderRadius: '50%', background: isCapturing ? colors.primaryDark : colors.white, border: `4px solid ${colors.primary}`, cursor: isCapturing ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isCapturing ? <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: colors.white }} /> : <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: colors.primary }} />}
        </button>
        <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '14px', padding: '12px 16px', color: colors.white, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><RotateCcw size={20} /> Flip</button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// Analysis Results
const AnalysisResultsScreen = ({ userData, onBack, setCurrentScreen }) => {
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => { setTimeout(() => setShowDetails(true), 500); }, []);
  return (
    <div style={{ minHeight: '100vh', background: colors.cream, paddingBottom: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <button onClick={onBack} style={{ background: colors.white, border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}><ArrowLeft size={20} color={colors.text} /></button>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: colors.text }}>Your Analysis</h2>
        <button style={{ background: colors.white, border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}><Share2 size={20} color={colors.text} /></button>
      </div>
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '24px', background: `linear-gradient(135deg, ${colors.gradient1} 0%, ${colors.gradient2} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '120px', height: '160px', borderRadius: '60px', border: `2px solid ${colors.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '64px' }}>👩</span></div>
          {showDetails && (
            <>
              <div style={{ position: 'absolute', top: '20%', right: '15%', background: colors.white, padding: '8px 12px', borderRadius: '20px', fontSize: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>Eye: Almond</div>
              <div style={{ position: 'absolute', bottom: '30%', left: '10%', background: colors.white, padding: '8px 12px', borderRadius: '20px', fontSize: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>Face: Oval</div>
              <div style={{ position: 'absolute', bottom: '15%', right: '20%', background: colors.white, padding: '8px 12px', borderRadius: '20px', fontSize: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>Warm Undertone</div>
            </>
          )}
        </div>
      </div>
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ background: colors.white, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          {[{ label: 'Face Shape', value: userData.faceShape }, { label: 'Skin Tone', value: `${userData.skinTone} ${userData.undertone}` }, { label: 'Eye Shape', value: userData.eyeShape }].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderBottom: i < 2 ? `1px solid ${colors.secondary}` : 'none' }}>
              <div><p style={{ color: colors.textLight, fontSize: '13px' }}>{item.label}</p><p style={{ color: colors.text, fontSize: '15px', fontWeight: '500' }}>{item.value}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: colors.text, marginBottom: '16px' }}>Your Matches</h3>
        {[{ icon: '💄', label: 'Makeup Recommendations', count: '24 products', screen: 'products' }, { icon: '💇‍♀️', label: 'Hairstyle Suggestions', count: '8 styles', screen: 'hairstyles' }, { icon: '✨', label: 'Try AR Makeup', count: 'Virtual try-on', screen: 'ar' }].map((item) => (
          <button key={item.label} onClick={() => setCurrentScreen(item.screen)} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: `${colors.primary}10`, borderRadius: '16px', border: `1px solid ${colors.primary}30`, cursor: 'pointer', textAlign: 'left', width: '100%', marginBottom: '12px' }}>
            <span style={{ fontSize: '32px' }}>{item.icon}</span>
            <div style={{ flex: 1 }}><p style={{ color: colors.text, fontSize: '16px', fontWeight: '500' }}>{item.label}</p><p style={{ color: colors.textLight, fontSize: '13px' }}>{item.count}</p></div>
            <ChevronRight size={20} color={colors.primary} />
          </button>
        ))}
      </div>
    </div>
  );
};

// Products Screen
const ProductsScreen = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('foundations');
  const categories = [{ id: 'foundations', label: 'Foundation', icon: '🧴' }, { id: 'lipsticks', label: 'Lips', icon: '💄' }, { id: 'eyeshadows', label: 'Eyes', icon: '🎨' }];
  const currentProducts = products[activeCategory] || [];
  return (
    <div style={{ minHeight: '100vh', background: colors.cream, paddingBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px', gap: '16px' }}>
        <button onClick={onBack} style={{ background: colors.white, border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}><ArrowLeft size={20} color={colors.text} /></button>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', color: colors.text }}>Product Matches</h2>
      </div>
      <div style={{ display: 'flex', gap: '10px', padding: '0 20px', marginBottom: '20px', overflowX: 'auto' }}>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '30px', background: activeCategory === cat.id ? colors.primary : colors.white, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <span>{cat.icon}</span><span style={{ color: activeCategory === cat.id ? colors.white : colors.text, fontSize: '14px', fontWeight: '500' }}>{cat.label}</span>
          </button>
        ))}
      </div>
      <div style={{ margin: '0 20px 20px', padding: '16px', background: `${colors.primary}15`, borderRadius: '16px', border: `1px solid ${colors.primary}30` }}>
        <p style={{ color: colors.text, fontSize: '14px' }}><strong>Your shade range:</strong> NC30-NC35 (Medium Warm)</p>
      </div>
      <div style={{ padding: '0 20px' }}>
        {currentProducts.map((product, i) => (
          <div key={product.id} style={{ display: 'flex', gap: '16px', padding: '20px', background: colors.white, borderRadius: '20px', marginBottom: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', position: 'relative' }}>
            {i === 0 && <div style={{ position: 'absolute', top: '12px', right: '12px', background: colors.gold, color: colors.white, padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} fill={colors.white} /> TOP</div>}
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0 }}>{product.image}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: colors.textLight, fontSize: '12px' }}>{product.brand}</p>
              <p style={{ color: colors.text, fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>{product.name}</p>
              <p style={{ color: colors.textLight, fontSize: '13px', marginBottom: '12px' }}>Shade: {product.shade}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: colors.secondary, padding: '6px 12px', borderRadius: '10px', fontSize: '13px', color: colors.primaryDark, fontWeight: '600' }}>{product.match}%</span>
                  <span style={{ color: colors.text, fontSize: '18px', fontWeight: '600' }}>${product.price}</span>
                </div>
                <button style={{ background: colors.primary, border: 'none', borderRadius: '12px', padding: '10px 20px', color: colors.white, fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><ShoppingBag size={14} />Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// AR Try-On
const ARTryOnScreen = ({ onBack }) => {
  const [intensity, setIntensity] = useState(80);
  const [selectedProducts, setSelectedProducts] = useState({ lips: true, eyes: false, cheeks: false });
  return (
    <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowLeft size={20} color={colors.white} /></button>
        <h2 style={{ color: colors.white, fontSize: '18px' }}>AR Try-On</h2>
        <button style={{ background: colors.primary, border: 'none', borderRadius: '20px', padding: '10px 20px', color: colors.white, cursor: 'pointer' }}>Done</button>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #3a2a2a 0%, #2a1a1a 100%)' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: '150px' }}>👩</span>
          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '100px', borderRadius: '40px', background: `rgba(232, 180, 184, ${intensity / 200})`, filter: 'blur(20px)' }} />
          {selectedProducts.lips && <div style={{ position: 'absolute', bottom: '25%', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '12px', borderRadius: '6px', background: `rgba(180, 80, 80, ${intensity / 150})`, filter: 'blur(3px)' }} />}
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px 24px 0 0', padding: '24px' }}>
        <div style={{ marginBottom: '20px', padding: '16px', background: colors.secondary, borderRadius: '16px' }}>
          <p style={{ color: colors.textLight, fontSize: '12px', marginBottom: '8px' }}>Currently Trying</p>
          <p style={{ color: colors.text, fontSize: '16px', fontWeight: '500', marginBottom: '16px' }}>Fenty Pro Filt'r 290 + Pillow Talk Lips</p>
          <div><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: colors.textLight, fontSize: '13px' }}>Intensity</span><span style={{ color: colors.text, fontSize: '13px', fontWeight: '500' }}>{intensity}%</span></div>
          <input type="range" min="0" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} style={{ width: '100%', height: '4px', borderRadius: '2px', background: colors.primary, appearance: 'none', cursor: 'pointer' }} /></div>
        </div>
        <p style={{ color: colors.textLight, fontSize: '13px', marginBottom: '12px' }}>Add More</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {[{ id: 'lips', label: '+ Lips' }, { id: 'eyes', label: '+ Eyes' }, { id: 'cheeks', label: '+ Cheeks' }].map((item) => (
            <button key={item.id} onClick={() => setSelectedProducts(prev => ({ ...prev, [item.id]: !prev[item.id] }))} style={{ padding: '12px 20px', borderRadius: '30px', background: selectedProducts[item.id] ? colors.primary : colors.white, border: `1px solid ${selectedProducts[item.id] ? colors.primary : colors.secondary}`, color: selectedProducts[item.id] ? colors.white : colors.text, cursor: 'pointer' }}>{item.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', background: colors.white, border: `1px solid ${colors.secondary}`, borderRadius: '16px', color: colors.text, cursor: 'pointer' }}><Camera size={18} />Capture</button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', background: colors.primary, border: 'none', borderRadius: '16px', color: colors.white, cursor: 'pointer' }}><Heart size={18} />Save Look</button>
        </div>
      </div>
    </div>
  );
};

// Hairstyles
const HairstylesScreen = ({ userData, onBack }) => (
  <div style={{ minHeight: '100vh', background: colors.cream, paddingBottom: '30px' }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '20px', gap: '16px' }}>
      <button onClick={onBack} style={{ background: colors.white, border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}><ArrowLeft size={20} color={colors.text} /></button>
      <div><h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', color: colors.text }}>Hairstyle Match</h2><p style={{ color: colors.textLight, fontSize: '13px' }}>Based on your {userData.faceShape} face shape</p></div>
    </div>
    <div style={{ margin: '0 20px 24px', padding: '20px', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, borderRadius: '20px', color: colors.white }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💎</div>
        <div><p style={{ fontSize: '14px', opacity: 0.8 }}>Your Face Shape</p><p style={{ fontSize: '20px', fontWeight: '500' }}>{userData.faceShape}</p></div>
      </div>
      <p style={{ marginTop: '16px', fontSize: '14px', opacity: 0.9, lineHeight: '1.5' }}>Oval faces are versatile and can pull off most hairstyles.</p>
    </div>
    <div style={{ padding: '0 20px' }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: colors.text, marginBottom: '16px' }}>Recommended Styles</h3>
      {hairstyles.map((style, i) => (
        <div key={style.id} style={{ display: 'flex', gap: '16px', padding: '20px', background: colors.white, borderRadius: '20px', marginBottom: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', position: 'relative' }}>
          {i === 0 && <div style={{ position: 'absolute', top: '12px', right: '12px', background: colors.gold, color: colors.white, padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>BEST MATCH</div>}
          <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0 }}>{style.image}</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: colors.text, fontSize: '17px', fontWeight: '500', marginBottom: '6px' }}>{style.name}</p>
            <p style={{ color: colors.textLight, fontSize: '13px', marginBottom: '12px' }}>{style.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ background: colors.secondary, padding: '6px 12px', borderRadius: '10px', fontSize: '13px', color: colors.primaryDark, fontWeight: '600' }}>{style.match}% match</span>
              <button style={{ background: colors.secondary, border: 'none', borderRadius: '12px', padding: '10px 16px', color: colors.primaryDark, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Wand2 size={14} />Try AR</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Skincare
const SkincareScreen = ({ userData }) => {
  const [activeRoutine, setActiveRoutine] = useState('morning');
  const [expandedStep, setExpandedStep] = useState(null);
  const routine = skincareRoutine[activeRoutine];
  return (
    <div style={{ minHeight: '100vh', background: colors.cream, paddingBottom: '100px' }}>
      <div style={{ padding: '20px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: colors.text, marginBottom: '8px' }}>Skincare</h1>
        <p style={{ color: colors.textLight, fontSize: '14px' }}>Personalized routine for {userData.skinType.toLowerCase()} skin</p>
      </div>
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <p style={{ color: colors.textLight, fontSize: '13px', marginBottom: '12px' }}>Your Concerns</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {userData.concerns.map((concern) => (<span key={concern} style={{ background: colors.white, padding: '10px 16px', borderRadius: '20px', fontSize: '13px', color: colors.text, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}><Check size={14} color={colors.primary} />{concern}</span>))}
          <button style={{ background: 'transparent', padding: '10px 16px', borderRadius: '20px', fontSize: '13px', color: colors.primary, border: `1px dashed ${colors.primary}`, cursor: 'pointer' }}>+ Add</button>
        </div>
      </div>
      <div style={{ display: 'flex', margin: '0 20px', background: colors.white, borderRadius: '16px', padding: '4px', marginBottom: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
        {[{ id: 'morning', label: 'Morning', icon: <Sun size={16} /> }, { id: 'evening', label: 'Evening', icon: <Moon size={16} /> }].map((r) => (
          <button key={r.id} onClick={() => setActiveRoutine(r.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', background: activeRoutine === r.id ? colors.primary : 'transparent', border: 'none', color: activeRoutine === r.id ? colors.white : colors.textLight, fontWeight: '500', cursor: 'pointer' }}>{r.icon}{r.label}</button>
        ))}
      </div>
      <div style={{ padding: '0 20px' }}>
        <div style={{ background: colors.white, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          {routine.map((step, i) => (
            <div key={step.step}>
              <button onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'transparent', border: 'none', borderBottom: i < routine.length - 1 ? `1px solid ${colors.secondary}` : 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primaryDark, fontSize: '13px', fontWeight: '600' }}>{step.step}</div>
                <span style={{ fontSize: '24px' }}>{step.icon}</span>
                <div style={{ flex: 1 }}><p style={{ color: colors.textLight, fontSize: '12px' }}>{step.type}</p><p style={{ color: colors.text, fontSize: '15px', fontWeight: '500' }}>{step.product}</p></div>
                <div style={{ background: colors.secondary, padding: '6px 10px', borderRadius: '8px', fontSize: '12px', color: colors.textLight }}>{step.time}</div>
                <ChevronRight size={18} color={colors.textLight} style={{ transform: expandedStep === step.step ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {expandedStep === step.step && (
                <div style={{ padding: '0 20px 20px', background: colors.secondary }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
                    <div><p style={{ color: colors.textLight, fontSize: '12px' }}>Why this product?</p><p style={{ color: colors.text, fontSize: '13px' }}>Perfect for {userData.skinType.toLowerCase()} skin.</p></div>
                    <button style={{ background: colors.primary, border: 'none', borderRadius: '10px', padding: '10px 16px', color: colors.white, fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>Shop</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '100px', left: '20px', right: '20px' }}>
        <button style={{ width: '100%', padding: '18px', borderRadius: '16px', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, border: 'none', color: colors.white, fontSize: '16px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(232, 180, 184, 0.4)' }}><Play size={18} fill={colors.white} />Start {activeRoutine === 'morning' ? 'Morning' : 'Evening'} Routine</button>
      </div>
    </div>
  );
};

// Subscription Modal
const SubscriptionModal = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 1000 }}>
      <div style={{ width: '100%', background: colors.cream, borderRadius: '24px 24px 0 0', padding: '24px', maxHeight: '90vh', overflow: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: colors.white, border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={18} color={colors.text} /></button>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: `linear-gradient(135deg, ${colors.gold} 0%, #B8860B 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Crown size={32} color={colors.white} /></div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: colors.text, marginBottom: '8px' }}>Unlock Premium</h2>
          <p style={{ color: colors.textLight, fontSize: '14px' }}>Get unlimited access to all features</p>
        </div>
        <div style={{ background: colors.white, borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
          {['Unlimited AI analyses', 'AR Try-on for all products', '500+ brand catalog', 'Ad-free experience', 'Exclusive launches'].map((feature, i) => (
            <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 4 ? `1px solid ${colors.secondary}` : 'none' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color={colors.primary} /></div>
              <span style={{ color: colors.text, fontSize: '14px' }}>{feature}</span>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '24px' }}>
          {[{ id: 'premium', name: 'Premium', price: '$9.99', period: '/month', popular: true }, { id: 'pro', name: 'Pro', price: '$19.99', period: '/month', desc: '+ 1:1 Consultations' }].map((plan) => (
            <button key={plan.id} onClick={() => setSelectedPlan(plan.id)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: selectedPlan === plan.id ? `${colors.primary}15` : colors.white, border: `2px solid ${selectedPlan === plan.id ? colors.primary : colors.secondary}`, borderRadius: '16px', cursor: 'pointer', marginBottom: '12px', position: 'relative' }}>
              {plan.popular && <span style={{ position: 'absolute', top: '-10px', right: '16px', background: colors.gold, color: colors.white, padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>MOST POPULAR</span>}
              <div style={{ textAlign: 'left' }}><p style={{ color: colors.text, fontSize: '17px', fontWeight: '500' }}>{plan.name}</p>{plan.desc && <p style={{ color: colors.textLight, fontSize: '13px' }}>{plan.desc}</p>}</div>
              <div><span style={{ color: colors.text, fontSize: '24px', fontWeight: '600' }}>{plan.price}</span><span style={{ color: colors.textLight, fontSize: '14px' }}>{plan.period}</span></div>
            </button>
          ))}
        </div>
        <button style={{ width: '100%', padding: '18px', borderRadius: '16px', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, border: 'none', color: colors.white, fontSize: '16px', fontWeight: '500', cursor: 'pointer', marginBottom: '16px', boxShadow: '0 10px 30px rgba(232, 180, 184, 0.4)' }}><Gift size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Start 7-Day Free Trial</button>
        <p style={{ textAlign: 'center', color: colors.textLight, fontSize: '12px' }}>Cancel anytime · Restore purchases</p>
      </div>
    </div>
  );
};

// Profile
const ProfileScreen = ({ userData, onShowSubscription }) => (
  <div style={{ minHeight: '100vh', background: colors.cream, paddingBottom: '100px' }}>
    <div style={{ padding: '20px', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, borderRadius: '0 0 32px 32px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '3px solid rgba(255,255,255,0.3)' }}>👩</div>
        <div><h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '26px', color: colors.white }}>{userData.name}</h1><p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Free Account</p></div>
      </div>
      <button onClick={onShowSubscription} style={{ width: '100%', marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Crown size={24} color={colors.gold} /><div style={{ textAlign: 'left' }}><p style={{ color: colors.white, fontSize: '15px', fontWeight: '500' }}>Upgrade to Premium</p><p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>2 free analyses remaining</p></div></div>
        <ChevronRight size={20} color={colors.white} />
      </button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '0 20px', marginBottom: '24px' }}>
      {[{ value: '3', label: 'Analyses' }, { value: '12', label: 'Saved Looks' }, { value: '8', label: 'Products' }].map((stat) => (
        <div key={stat.label} style={{ background: colors.white, padding: '16px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', fontWeight: '600', color: colors.primary }}>{stat.value}</p>
          <p style={{ color: colors.textLight, fontSize: '12px' }}>{stat.label}</p>
        </div>
      ))}
    </div>
    <div style={{ padding: '0 20px' }}>
      <div style={{ background: colors.white, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        {[{ icon: '👤', label: 'Edit Profile' }, { icon: '🔔', label: 'Notifications' }, { icon: '💾', label: 'Saved Looks' }, { icon: '📦', label: 'Purchase History' }, { icon: '⚙️', label: 'Settings' }, { icon: '❓', label: 'Help & Support' }].map((item, i) => (
          <button key={item.label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: 'transparent', border: 'none', borderBottom: i < 5 ? `1px solid ${colors.secondary}` : 'none', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span><span style={{ flex: 1, color: colors.text, fontSize: '15px' }}>{item.label}</span><ChevronRight size={18} color={colors.textLight} />
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Main App
export default function GlowGuideApp() {
  const [appState, setAppState] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);

  const renderScreen = () => {
    if (currentScreen === 'camera') return <CameraScreen onBack={() => setCurrentScreen(null)} onAnalyze={() => setCurrentScreen('results')} />;
    if (currentScreen === 'results') return <AnalysisResultsScreen userData={mockUserData} onBack={() => setCurrentScreen(null)} setCurrentScreen={setCurrentScreen} />;
    if (currentScreen === 'products') return <ProductsScreen onBack={() => setCurrentScreen(null)} />;
    if (currentScreen === 'ar') return <ARTryOnScreen onBack={() => setCurrentScreen(null)} />;
    if (currentScreen === 'hairstyles') return <HairstylesScreen userData={mockUserData} onBack={() => setCurrentScreen(null)} />;
    if (currentScreen === 'skincare') return <SkincareScreen userData={mockUserData} />;
    switch (activeTab) {
      case 'home': return <HomeScreen userData={mockUserData} setCurrentScreen={setCurrentScreen} />;
      case 'explore': return <ProductsScreen onBack={() => setActiveTab('home')} />;
      case 'skincare': return <SkincareScreen userData={mockUserData} />;
      case 'profile': return <ProfileScreen userData={mockUserData} onShowSubscription={() => setShowSubscription(true)} />;
      default: return null;
    }
  };

  if (appState === 'splash') return <SplashScreen onComplete={() => setAppState('onboarding')} />;
  if (appState === 'onboarding') return <OnboardingScreen onComplete={() => setAppState('main')} />;

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", maxWidth: '430px', margin: '0 auto', position: 'relative', minHeight: '100vh', background: colors.cream }}>
      {renderScreen()}
      {!['camera', 'results', 'products', 'ar', 'hairstyles'].includes(currentScreen) && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
      {showSubscription && <SubscriptionModal onClose={() => setShowSubscription(false)} />}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@400;500;600&display=swap');*{margin:0;padding:0;box-sizing:border-box}input[type="range"]{-webkit-appearance:none}input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:${colors.primaryDark};cursor:pointer}::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
