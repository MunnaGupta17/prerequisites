// backend/prisma/seed.js
// Run this with: node prisma/seed.js
// It fills your database with starter destinations + sample tips

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── DESTINATIONS ──────────────────────────────────────────────
  const destinations = await Promise.all([
    prisma.destination.upsert({
      where: { slug: 'thailand' },
      update: {},
      create: {
        slug: 'thailand', name: 'Thailand', country: 'Thailand',
        region: 'Southeast Asia', emoji: '🇹🇭',
        description: 'Land of smiles, temples, street food, and stunning beaches.',
        visaInfo: 'Indians get 30 days visa-free (as of Nov 2023). Extendable by 30 more days.',
        currency: 'Thai Baht (THB) — 1 THB ≈ ₹2.5',
        bestSeason: 'November to February (cool & dry)',
        budgetRange: '₹3,000 – ₹8,000/day including stay & food',
      }
    }),
    prisma.destination.upsert({
      where: { slug: 'japan' },
      update: {},
      create: {
        slug: 'japan', name: 'Japan', country: 'Japan',
        region: 'East Asia', emoji: '🇯🇵',
        description: 'Ultra-modern cities, ancient temples, world-class food.',
        visaInfo: 'Visa required for Indians. Apply at Japanese consulate — takes 5–7 days.',
        currency: 'Japanese Yen (JPY) — 1 JPY ≈ ₹0.55',
        bestSeason: 'March–May (cherry blossoms) or Oct–Nov (autumn)',
        budgetRange: '₹7,000 – ₹18,000/day',
      }
    }),
    prisma.destination.upsert({
      where: { slug: 'bali' },
      update: {},
      create: {
        slug: 'bali', name: 'Bali', country: 'Indonesia',
        region: 'Southeast Asia', emoji: '🇮🇩',
        description: 'Rice terraces, surf beaches, Hindu temples and lush jungle.',
        visaInfo: 'Indians get visa on arrival — $35 USD for 30 days at airport.',
        currency: 'Indonesian Rupiah (IDR) — 1 IDR ≈ ₹0.0053',
        bestSeason: 'May to September (dry season)',
        budgetRange: '₹2,500 – ₹7,000/day',
      }
    }),
    prisma.destination.upsert({
      where: { slug: 'italy' },
      update: {},
      create: {
        slug: 'italy', name: 'Italy', country: 'Italy',
        region: 'Europe', emoji: '🇮🇹',
        description: 'Rome, Venice, Florence — history, art, pasta and gelato.',
        visaInfo: 'Schengen visa required for Indians. Apply 3–4 weeks in advance.',
        currency: 'Euro (EUR) — 1 EUR ≈ ₹90',
        bestSeason: 'April–June or September–October',
        budgetRange: '₹10,000 – ₹25,000/day',
      }
    }),
    prisma.destination.upsert({
      where: { slug: 'vietnam' },
      update: {},
      create: {
        slug: 'vietnam', name: 'Vietnam', country: 'Vietnam',
        region: 'Southeast Asia', emoji: '🇻🇳',
        description: 'Halong Bay, hoi an lanterns, pho, and incredible coastline.',
        visaInfo: 'Indians need e-visa — apply online at evisa.xuatnhapcanh.gov.vn. $25, takes 3 days.',
        currency: 'Vietnamese Dong (VND) — 1 VND ≈ ₹0.0035',
        bestSeason: 'February to April (central & south)',
        budgetRange: '₹2,000 – ₹6,000/day',
      }
    }),
    prisma.destination.upsert({
      where: { slug: 'dubai' },
      update: {},
      create: {
        slug: 'dubai', name: 'Dubai', country: 'UAE',
        region: 'Middle East', emoji: '🇦🇪',
        description: 'Futuristic skyline, desert safaris, luxury malls and gold souks.',
        visaInfo: 'Indians get visa on arrival — free 30-day visa since 2024.',
        currency: 'UAE Dirham (AED) — 1 AED ≈ ₹23',
        bestSeason: 'November to March (pleasant weather)',
        budgetRange: '₹8,000 – ₹30,000/day',
      }
    }),
  ])

  console.log(`✅  ${destinations.length} destinations created`)

  // ── TIPS FOR THAILAND ─────────────────────────────────────────
  const thailand = destinations[0]

  const thailandTips = [
    {
      text: "Tuk-tuk 'closed temple' scam: If a driver tells you Wat Pho or the Grand Palace is 'closed today for a ceremony' — it's always a lie. They take you to a gem shop where they earn commission. Major Bangkok temples are open 365 days a year. Just walk away and grab a metered cab or Grab.",
      category: 'SCAM', travellerType: 'SOLO',
      authorName: 'Rahul K.', authorFrom: 'Delhi, India', voteCount: 284,
      bestMonths: ['november','december','january','february','march']
    },
    {
      text: "Indians get 30 days visa-free since November 2023. You need: return ticket, hotel booking, and a bank statement showing ₹50,000+. Immigration at Suvarnabhumi DOES ask for these — carry printed copies. You can extend for 30 more days at any immigration office inside Thailand for around ₹1,800.",
      category: 'VISA', travellerType: 'SOLO',
      authorName: 'Priya S.', authorFrom: 'Mumbai, India', voteCount: 201,
      bestMonths: ['november','december','january','february']
    },
    {
      text: "Thai ATMs charge a flat ₹220 (~100 THB) fee per transaction no matter the amount. Always withdraw the maximum (usually 20,000 THB) to minimize fee hits. NEVER accept 'dynamic currency conversion' — always pay in Thai Baht, not INR. Use a Niyo Global or ICICI Zero Forex card to save on conversion fees.",
      category: 'MONEY', travellerType: 'BUDGET',
      authorName: 'Arjun V.', authorFrom: 'Bangalore, India', voteCount: 178,
      bestMonths: ['november','december','january','february','march','april']
    },
    {
      text: "Get Grab app before you land — it's Ola/Uber for Thailand and works in Bangkok, Phuket, and Chiang Mai. Fixed prices, no haggling, no cheating. For Bangkok, buy a Rabbit Card (like Delhi Metro card) on Day 1 — BTS Skytrain + MRT covers most tourist spots and is way cheaper than cabs.",
      category: 'TRANSPORT', travellerType: 'SOLO',
      authorName: 'Nikhil K.', authorFrom: 'Chennai, India', voteCount: 134,
      bestMonths: ['november','december','january','february']
    },
    {
      text: "Vegetarian? Say 'gin jay' (กินเจ) — not just 'no meat'. Fish sauce and oyster sauce get added to almost everything unless you say this. Near Pahurat area in Bangkok (Little India) you'll find full Indian thalis for 80–100 THB. Best kept secret for Indian travellers.",
      category: 'FOOD', travellerType: 'FAMILY',
      authorName: 'Sneha M.', authorFrom: 'Ahmedabad, India', voteCount: 156,
      bestMonths: ['november','december','january','february','march']
    },
    {
      text: "Temple dress code is strict everywhere. Carry a light sarong or shawl — buy one for 50 THB from any street stall. No shorts, no sleeveless tops inside temples. Shoes must be removed. Never point your feet at a Buddha statue. Thais take this seriously and it's a sign of respect.",
      category: 'CULTURE', travellerType: 'FAMILY',
      authorName: 'Vikram R.', authorFrom: 'Hyderabad, India', voteCount: 142,
      bestMonths: ['november','december','january','february','march','april']
    },
    {
      text: "Get an AIS or DTAC SIM at the airport on arrival — counters are right after immigration. Around ₹600 equivalent for 30 days unlimited data + some calling credit. Don't rely on roaming — it's expensive and slow. WhatsApp works perfectly on Thai SIM for keeping in touch back home.",
      category: 'PACKING', travellerType: 'SOLO',
      authorName: 'Ananya P.', authorFrom: 'Pune, India', voteCount: 119,
      bestMonths: ['november','december','january','february']
    },
    {
      text: "Gem scam near Chatuchak and tourist areas: a friendly local will tell you about a 'one day only government sale' or invite you to a special jewellery shop. The gems are fake and massively overpriced. If a stranger is being unusually friendly and helpful — be suspicious. This scam has been running for 30+ years.",
      category: 'SCAM', travellerType: 'SOLO',
      authorName: 'Karan S.', authorFrom: 'Delhi, India', voteCount: 198,
      bestMonths: ['november','december','january','february','march']
    },
    {
      text: "Hostel dorms in Bangkok run ₹600–900/night, budget guesthouses ₹1,200–2,000, decent mid-range hotels ₹2,500–4,500. Silom and Sukhumvit areas are best located — close to BTS stations. Book Nimman area in Chiang Mai for cafes and a relaxed vibe. Avoid Khao San Road hotels — noisy and overpriced for what you get.",
      category: 'ACCOMMODATION', travellerType: 'BUDGET',
      authorName: 'Rohan T.', authorFrom: 'Mumbai, India', voteCount: 87,
      bestMonths: ['november','december','january','february']
    },
    {
      text: "Pad Thai from street stalls costs 60–80 THB. The same dish in a restaurant near tourist spots costs 180–300 THB. Follow locals for food — if you see Thai people eating there, it's good and cheap. Night markets (Rot Fai, Chatuchak weekend market) are the best bang for your food budget.",
      category: 'FOOD', travellerType: 'BUDGET',
      authorName: 'Divya N.', authorFrom: 'Kochi, India', voteCount: 112,
      bestMonths: ['november','december','january','february','march']
    },
  ]

  for (const tip of thailandTips) {
    await prisma.tip.create({
      data: { ...tip, destinationId: thailand.id }
    })
  }

  console.log(`✅  ${thailandTips.length} Thailand tips created`)

  // ── TIPS FOR JAPAN ────────────────────────────────────────────
  const japan = destinations[1]

  const japanTips = [
    {
      text: "Get a Suica or Pasmo IC card at any JR station — it works on trains, metro, buses, and even at convenience stores and vending machines. Add money at any kiosk. Don't waste time buying individual tickets. The IC card saves you time on every single journey.",
      category: 'TRANSPORT', travellerType: 'SOLO',
      authorName: 'Amit G.', authorFrom: 'Delhi, India', voteCount: 203,
      bestMonths: ['march','april','october','november']
    },
    {
      text: "Japan is still very cash-heavy — many restaurants, temples, and small shops are cash-only. Always keep at least ¥5,000–10,000 in your wallet. 7-Eleven and Japan Post ATMs reliably accept international cards. Withdraw from these — not random ATMs that may reject foreign cards.",
      category: 'MONEY', travellerType: 'SOLO',
      authorName: 'Meera J.', authorFrom: 'Bangalore, India', voteCount: 176,
      bestMonths: ['march','april','may','october','november']
    },
    {
      text: "Indian visa for Japan: apply at VFS Global in your city. You need 3 months of bank statements, ITR for 2 years, employment letter, and confirmed bookings. Takes 5–7 working days. They rarely reject Indian applicants if documents are solid. Apply at least 3 weeks before travel.",
      category: 'VISA', travellerType: 'SOLO',
      authorName: 'Sanjay R.', authorFrom: 'Mumbai, India', voteCount: 145,
      bestMonths: ['march','april','may','october','november']
    },
  ]

  for (const tip of japanTips) {
    await prisma.tip.create({
      data: { ...tip, destinationId: japan.id }
    })
  }

  console.log(`✅  ${japanTips.length} Japan tips created`)

  // ── TIPS FOR BALI ─────────────────────────────────────────────
  const bali = destinations[2]

  const baliTips = [
    {
      text: "Rent a scooter if you're comfortable riding one — ₹500/day and gives you total freedom. But wear a helmet (police checkpoints are common and fine is ~₹800), get international driving permit before leaving India, and don't ride after dark in rural areas. Grab and Gojek apps work in busy areas if you don't want to ride.",
      category: 'TRANSPORT', travellerType: 'SOLO',
      authorName: 'Ishaan V.', authorFrom: 'Goa, India', voteCount: 167,
      bestMonths: ['may','june','july','august','september']
    },
    {
      text: "Bali is very cash-dependent outside tourist areas. Get IDR from moneychangers on the street — NOT the airport. Airport rates are terrible (15–20% worse). Reputable changers on Legian Street in Kuta or Seminyak give the best rates. Always count your notes carefully — short-changing is a known trick.",
      category: 'MONEY', travellerType: 'COUPLE',
      authorName: 'Pooja S.', authorFrom: 'Pune, India', voteCount: 134,
      bestMonths: ['may','june','july','august','september']
    },
  ]

  for (const tip of baliTips) {
    await prisma.tip.create({
      data: { ...tip, destinationId: bali.id }
    })
  }

  console.log(`✅  ${baliTips.length} Bali tips created`)

  console.log('\n🎉 Seeding complete! Your database is ready.')
  console.log('   Test it: curl http://localhost:5000/api/destinations')
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
