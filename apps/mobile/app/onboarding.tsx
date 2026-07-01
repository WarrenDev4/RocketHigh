import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VideoView, useVideoPlayer } from 'expo-video';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Animated, StatusBar,
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Onboarding() {
  const player = useVideoPlayer(
  require('../assets/8189164-uhd_3840_2160_25fps.mp4'),
  (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  }
);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGetStarted = async () => {
  await AsyncStorage.setItem('hasSeenOnboarding', 'true');
  router.replace('/(auth)/signup');
};

  const handleLogin = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(auth)/login');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── HERO SECTION ── */}
        <View style={styles.heroSection}>
          <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen={false}
            contentFit="cover"
          />
        </View>

          {/* Nav bar area — logo text + auth buttons */}
          <View style={styles.navBar}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/RocketHigh_Official_Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navBtnOutline} onPress={handleLogin}>
                <Text style={styles.navBtnOutlineText}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtnPrimary} onPress={handleGetStarted}>
                <Text style={styles.navBtnPrimaryText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Badge */}
          <View style={styles.badge}>
            <View style={styles.pulseDot} />
            <Text style={styles.badgeText}>NOW IN DEVELOPMENT</Text>
          </View>

          {/* H1 */}
          <Text style={styles.h1}>Level up your business.</Text>
          <Text style={styles.h1Purple}>With AI.</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            RocketHigh handles the business side so you can focus on the work. AI-powered proposals, invoices, contracts, and client communication — ready in seconds, not hours.
          </Text>

          {/* CTA Buttons — mirrors landing page hero buttons */}
          <TouchableOpacity style={styles.btnPrimary} onPress={handleGetStarted}>
            <Text style={styles.btnPrimaryText}>Get Early Access</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} onPress={() => {}}>
            <Text style={styles.btnOutlineText}>See Features</Text>
          </TouchableOpacity>

          {/* Stats row — mirrors landing page hero stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>3</Text>
              <Text style={styles.statLabel}>AI tools at launch</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>&lt;30s</Text>
              <Text style={styles.statLabel}>To generate a proposal</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>3</Text>
              <Text style={styles.statLabel}>Platforms</Text>
            </View>
          </View>
        </View>

        {/* ── WHO IT'S FOR ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Built for every stage of business</Text>
          <Text style={styles.sectionSub}>
            Whether you're a solo freelancer or running a growing company, RocketHigh scales with you.
          </Text>
          <View style={styles.whoGrid}>
            {whoCards.map((w, i) => (
              <View key={i} style={styles.whoCard}>
                <Text style={styles.whoEmoji}>{w.icon}</Text>
                <View style={styles.whoText}>
                  <Text style={styles.whoLabel}>{w.label}</Text>
                  <Text style={styles.whoSub}>{w.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── FEATURES ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business ops, automated</Text>
          <Text style={styles.sectionSub}>
            Describe your situation in plain English. RocketHigh handles the rest.
          </Text>
          {features.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <View style={styles.featureIconBox}>
                <Text style={styles.featureIconText}>{f.icon}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureName}>{f.name}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
                <View style={[styles.featureTag, f.soon && styles.featureTagSoon]}>
                  <Text style={[styles.featureTagText, f.soon && styles.featureTagTextSoon]}>
                    {f.tag}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ── HOW IT WORKS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it works</Text>
          <Text style={styles.sectionSub}>
            Professional output in three steps. No templates, no formatting, no wasted time.
          </Text>
          {steps.map((s, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── PRICING ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Simple, honest pricing</Text>
          <Text style={styles.sectionSub}>Start free, pay when it saves you real time. Cancel anytime.</Text>
          {pricing.map((p, i) => (
            <View key={i} style={[styles.pricingCard, p.featured && styles.pricingFeatured]}>
              {p.featured && (
                <View style={styles.pricingBadgeWrap}>
                  <Text style={styles.pricingBadgeText}>Most popular</Text>
                </View>
              )}
              <Text style={styles.pricingTier}>{p.tier}</Text>
              <Text style={styles.pricingPrice}>
                {p.price}<Text style={styles.pricingPer}> / month</Text>
              </Text>
              <Text style={styles.pricingDesc}>{p.desc}</Text>
              <View style={styles.pricingDivider} />
              {p.features.map((f, fi) => (
                <View key={fi} style={styles.pricingFeatureRow}>
                  <Text style={styles.pricingCheck}>✓</Text>
                  <Text style={styles.pricingFeature}>{f}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={p.featured ? styles.btnPrimary : styles.btnOutline}
                onPress={handleGetStarted}
              >
                <Text style={p.featured ? styles.btnPrimaryText : styles.btnOutlineText}>
                  {p.featured ? 'Get early access' : p.tier === 'BUSINESS' ? 'Contact us' : 'Get started free'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ── CTA BANNER ── */}
        <View style={styles.ctaBanner}>
          <Text style={styles.ctaTitle}>Ready to empower and streamline your business?</Text>
          <Text style={styles.ctaSub}>
            Coming soon to iOS, Android, and Web. Early access to be announced.
          </Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={handleGetStarted}>
            <Text style={styles.btnPrimaryText}>Get Early Access</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnOutline, { marginTop: 10 }]} onPress={handleLogin}>
            <Text style={styles.btnOutlineText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            {['Features', 'Pricing', 'How It Works', 'Contact'].map((l, i) => (
              <Text key={i} style={styles.footerLink}>{l}</Text>
            ))}
          </View>
          <Text style={styles.footerCopy}>© 2026 RocketHigh. All rights reserved.</Text>
        </View>

      </ScrollView>
    </Animated.View>
  );
}

const whoCards = [
  { icon: '💻', label: 'Freelancers', sub: 'Designers, developers, writers, consultants' },
  { icon: '🏪', label: 'Small businesses', sub: 'Agencies, studios, service providers' },
  { icon: '🚀', label: 'Startups', sub: 'Early teams moving fast without admin overhead' },
  { icon: '🏢', label: 'Enterprises', sub: 'Teams that need smarter business operations' },
];

const features = [
  { icon: '✦', name: 'AI proposal writer', desc: 'Stop staring at blank pages. Describe your client and project — get a tailored, professional proposal in under 30 seconds.', tag: 'Launching Day 1', soon: false },
  { icon: '✦', name: 'Smart invoice generator', desc: 'Input your project details and get a clean, professional invoice instantly. Track payment status automatically.', tag: 'Launching Day 1', soon: false },
  { icon: '✦', name: 'AI client email writer', desc: 'Raising rates? Pushing back on scope? Chasing a late payment? Get 2–3 professional email drafts in seconds.', tag: 'Launching Day 1', soon: false },
  { icon: '✦', name: 'Contract generator', desc: 'Generate professional contracts tailored to your project and client. Protect yourself without spending hours on legal documents.', tag: 'Coming in Phase 2', soon: true },
  { icon: '✦', name: 'Earnings & client insights', desc: 'Discover which clients are most profitable, track your real hourly rate, and get AI-powered rate recommendations.', tag: 'Coming in Phase 2', soon: true },
  { icon: '✦', name: 'AI second brain', desc: 'Your notes, client briefs, deadlines, and tasks — all organized automatically. A smart workspace that surfaces what matters.', tag: 'Coming in Phase 3', soon: true },
];

const steps = [
  { title: 'Describe your situation', desc: 'Tell RocketHigh what you need in plain English — the client, the project, the problem. No forms, no templates.' },
  { title: 'AI generates it instantly', desc: 'Our AI produces professional, tailored output in seconds — proposals, invoices, emails, and contracts that sound like you.' },
  { title: 'Review, edit, and send', desc: 'Make any tweaks you want and send directly to your client. What used to take hours now takes under a minute.' },
];

const pricing = [
  {
    tier: 'FREE', price: '$0', desc: 'Try it out — no credit card needed.', featured: false,
    features: ['3 AI generations per month', 'Proposals, invoices & emails', 'Mobile & web access'],
  },
  {
    tier: 'PRO', price: '$19', desc: 'Everything you need to run your business smarter.', featured: true,
    features: ['Unlimited AI generations', 'All tools — proposals, invoices, emails, contracts', 'Earnings & client insights', 'No ads', 'Priority support'],
  },
  {
    tier: 'BUSINESS', price: '$99', desc: 'For agencies and teams who need more power.', featured: false,
    features: ['Everything in Pro', 'Up to 10 team members', 'Team collaboration tools', 'Advanced analytics', 'Dedicated support'],
  },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 0 },

  // NAV BAR
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  navLogo: { fontSize: 18, fontWeight: '800', color: 'white' },
  navButtons: { flexDirection: 'row', gap: 8 },
  navBtnOutline: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  navBtnOutlineText: { color: 'white', fontSize: 13, fontWeight: '600' },
  navBtnPrimary: {
    backgroundColor: '#2eb160',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  navBtnPrimaryText: { color: 'white', fontSize: 13, fontWeight: '700' },

  // HERO
heroSection: {
  backgroundColor: '#050505',
  padding: 24,
  paddingTop: 56,
  paddingBottom: 40,
  borderBottomWidth: 1,
  borderBottomColor: '#1a1a1a',
  position: 'relative', // 🔥 ADD THIS
  overflow: 'hidden',    // 🔥 IMPORTANT
},
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(64,56,213,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 213, 100, 0.4)',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 20,
    gap: 8,
  },
  pulseDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#9fffbd' },
  badgeText: { color: '#9fffbd', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  h1: { fontSize: 36, fontWeight: '800', color: 'white', lineHeight: 42, letterSpacing: -0.5 },
  h1Purple: { fontSize: 36, fontWeight: '800', color: '#9fffbd', lineHeight: 42, letterSpacing: -0.5, marginBottom: 16 },
  subtitle: { fontSize: 15, color: '#94b8ae', lineHeight: 24, marginBottom: 28 },

 logoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 0,
  flexGrow: 0,
  flexShrink: 0,
  maxHeight: 60,
  width: 140,  // ← ADD THIS - lock it in place
},
logo: {
  width: 130,
  height: 40,
  resizeMode: 'contain',
  flex: 0,
  flexGrow: 0,
  flexShrink: 0,
},

  // BUTTONS
  btnPrimary: {
    backgroundColor: '#38d5a1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#38d5a1',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  btnPrimaryText: { color: 'white', fontSize: 16, fontWeight: '700' },
  btnOutline: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1.5,
    borderColor: '#333',
  },
  btnOutlineText: { color: 'white', fontSize: 15, fontWeight: '600' },
  // STATS
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 0,
  },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '800', color: 'white' },
  statLabel: { fontSize: 10, color: '#94a3b8', marginTop: 4, textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: '#222', marginVertical: 4 },

  // SECTIONS
  section: { padding: 24, paddingTop: 48, borderBottomWidth: 1, borderBottomColor: '#111' },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: 'white', marginBottom: 8, letterSpacing: -0.3 },
  sectionSub: { fontSize: 14, color: '#94a3b8', lineHeight: 22, marginBottom: 24 },

  // WHO
  whoGrid: { gap: 10 },
  whoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#111',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  whoEmoji: { fontSize: 22 },
  whoText: { flex: 1 },
  whoLabel: { fontSize: 14, fontWeight: '600', color: 'white' },
  whoSub: { fontSize: 12, color: '#aa94b8', marginTop: 2 },

  videoContainer: {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
},

video: {
  width: '100%',
  height: '100%',
},

heroOverlay: {
  position: 'relative',
  zIndex: 1,
},

  // FEATURES
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222',
    gap: 12,
  },
  featureIconBox: {
    width: 40, height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(64,56,213,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureIconText: { fontSize: 16, color: '#9fffc9' },
  featureContent: { flex: 1 },
  featureName: { fontSize: 14, fontWeight: '700', color: 'white', marginBottom: 4 },
  featureDesc: { fontSize: 13, color: '#94a3b8', lineHeight: 20 },
  featureTag: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(64,56,213,0.12)',
  },
  featureTagSoon: { backgroundColor: 'rgba(100,100,100,0.15)' },
  featureTagText: { fontSize: 11, fontWeight: '700', color: '#a89fff' },
  featureTagTextSoon: { color: '#555' },

  // HOW IT WORKS
  stepRow: { flexDirection: 'row', gap: 14, marginBottom: 20, alignItems: 'flex-start' },
  stepNum: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(64,56,213,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(64,56,213,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumText: { color: '#9fffdf', fontWeight: '800', fontSize: 16 },
  stepContent: { flex: 1, paddingTop: 8 },
  stepTitle: { fontSize: 14, fontWeight: '700', color: 'white', marginBottom: 4 },
  stepDesc: { fontSize: 13, color: '#94b8ab', lineHeight: 20 },

  // PRICING
  pricingCard: {
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  pricingFeatured: {
    borderColor: '#38d5a1',
    backgroundColor: '#0e0d2a',
    position: 'relative',
  },
  pricingBadgeWrap: {
    alignSelf: 'flex-start',
    backgroundColor: '#38d5a1',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
    overflow: 'hidden',
  },
  pricingBadgeText: { color: 'white', fontSize: 11, fontWeight: '700' },
  pricingTier: { fontSize: 11, fontWeight: '700', color: '#94b8ae', letterSpacing: 1, marginBottom: 4 },
  pricingPrice: { fontSize: 32, fontWeight: '800', color: 'white', marginBottom: 4 },
  pricingPer: { fontSize: 14, fontWeight: '400', color: '#94b8ae' },
  pricingDesc: { fontSize: 13, color: '#94a3b8', marginBottom: 14 },
  pricingDivider: { borderTopWidth: 1, borderTopColor: '#222', marginBottom: 14 },
  pricingFeatureRow: { flexDirection: 'row', gap: 8, marginBottom: 6, alignItems: 'flex-start' },
  pricingCheck: { color: '#94b8ae', fontSize: 13, fontWeight: '700', marginTop: 1 },
  pricingFeature: { fontSize: 13, color: '#94b8ae', flex: 1, lineHeight: 20 },

  // CTA BANNER
  ctaBanner: {
    margin: 24,
    backgroundColor: '#0e0d2a',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#222',
  },
  ctaTitle: { fontSize: 20, fontWeight: '800', color: 'white', textAlign: 'center', marginBottom: 10, letterSpacing: -0.3 },
  ctaSub: { fontSize: 13, color: '#94a3b8', textAlign: 'center', marginBottom: 24, lineHeight: 20 },

  // FOOTER
  footer: { padding: 24, paddingTop: 32, borderTopWidth: 1, borderTopColor: '#111' },
  footerLinks: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 16, justifyContent: 'center' },
  footerLink: { fontSize: 13, color: '#555' },
  footerCopy: { textAlign: 'center', color: '#333', fontSize: 12, paddingBottom: 32 },
});

