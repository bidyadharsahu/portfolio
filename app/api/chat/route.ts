import { NextRequest, NextResponse } from 'next/server';

type Lang = 'en' | 'hi' | 'od' | 'sa';

// Multilingual bot responses
const RESPONSES: Record<Lang, Record<string, string>> = {
  en: {
    greeting: "Namaskar! 🙏 I'm Bidyadhar's virtual assistant. Ask me about projects, skills, hiring, meetings, meditation, or donations. How can I help?",
    projects: "Bidyadhar has built some amazing projects!\n\n🚗 **Namaste Rides** — A fair, driver-first ride-hailing platform\n🕶️ **NetrikXR** — Web-based AR experiences — no app needed!\n📱 **QR Code Menu** — Contactless restaurant ordering system\n🌐 **This Portfolio** — Full-stack platform with CRM & multilingual support\n\nWant details on any of these?",
    namaste: "🚗 **Namaste Rides** is a next-gen ride-hailing platform built to be fair and transparent. Features include 24/7 availability, low commissions for drivers, and smart safety tech.\n\n🔗 Live: https://namaste-ruby.vercel.app/",
    netrik: "🕶️ **NetrikXR** brings augmented reality to the web! No app downloads needed — just point, scan, and experience. AR photo frames, business cards, menus & more.\n\n🔗 Live: https://web-ar-phi.vercel.app/",
    qr: "📱 **QR Code Menu** is a premium contactless ordering system for restaurants. Customers scan, browse, and order from their phone.\n\n🔗 Live: https://qr-cod-shop.vercel.app/",
    hire: "Great choice! 🎯 Here's how to get started:\n\n1. **Create an account** on the Register page\n2. Describe your project requirements\n3. Bidyadhar will review and get back to you!\n\n📧 Email: bidyadhar.sahu.cse.2022@nist.edu\n💼 Or schedule a meeting — just say 'book a meeting'!",
    skills: "💪 Bidyadhar's tech stack:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS\n**Backend:** Node.js, Python, Express, FastAPI\n**Cloud:** AWS (Lambda, DynamoDB, Amplify), Docker\n**Web3:** Solidity, Ethereum, Smart Contracts\n**AR/VR:** WebAR, Three.js, A-Frame\n**DB:** Supabase, PostgreSQL, MongoDB\n\nAnything specific you'd like to know?",
    meditation: "🧘 We offer guided meditation and wellness sessions! The Meditation section is launching soon with live classes, breathing exercises, and chakra healing.\n\nStay tuned — or ask me to schedule a meeting to discuss private sessions!",
    donate: "💝 Your support means the world! You can donate via UPI:\n\n**UPI ID:** bidyadharsahu@ptyes\n\nPreset amounts: ₹100, ₹500, ₹1,000, ₹5,000\nEvery contribution helps fuel open-source and innovation!\n\n👉 Visit the Donate page to contribute.",
    contact: "📬 Reach Bidyadhar through:\n\n📧 Email: bidyadhar.sahu.cse.2022@nist.edu\n💻 GitHub: github.com/bidyadharsahu\n🌐 Portfolio: bidyadharsahu.tech\n\n📅 Or say 'book a meeting' to schedule a call!",
    about: "👨‍💻 **Bidyadhar Sahu** is a cloud developer & blockchain enthusiast from Odisha, India. He builds innovative solutions — from Web3 to AR apps — with a focus on real-world impact.\n\n🎓 Currently at NIST, Berhampur\n🛠️ 15+ projects delivered\n⭐ 5.0 client rating\n\nWant to see his work? Say 'projects'!",
    meeting: "📅 **Let's schedule a meeting!**\n\nPlease tell me:\n1. **Your name**\n2. **Preferred date & time**\n3. **What you'd like to discuss**\n\nOr visit the **Calendar** page to see available slots. Bidyadhar typically responds within 24 hours!\n\n📧 You can also email: bidyadhar.sahu.cse.2022@nist.edu",
    price: "💰 Project pricing depends on scope and complexity:\n\n• **Simple website/landing page:** ₹5,000 - ₹15,000\n• **Full-stack web app:** ₹20,000 - ₹80,000\n• **Blockchain/Smart contracts:** ₹30,000 - ₹1,00,000\n• **AR/VR experience:** ₹25,000 - ₹75,000\n\nLet's discuss your specific needs! Say 'hire' or 'book a meeting'.",
    time: "⏱️ Typical project timelines:\n\n• **Small projects:** 1-2 weeks\n• **Medium projects:** 3-6 weeks\n• **Large/complex projects:** 2-3 months\n\nBidyadhar delivers on time with regular progress updates!",
    thanks: "You're most welcome! 🙏 Is there anything else I can help with? Feel free to ask about projects, pricing, or schedule a meeting!",
    calendar: "📅 Check the **Calendar** page for upcoming events, meditation classes, and livestreams. You can also schedule meetings there!\n\nWant me to help book a meeting? Just say 'book a meeting'!",
    livestream: "📺 Live coding sessions and tech talks are coming soon! Watch for Next.js, Web3, and AR/VR tutorials.\n\nVisit the **Livestream** page to stay updated!",
    feedback: "📝 Your feedback is valuable! Visit the **Feedback** page to rate the website and Bidyadhar's work. It helps improve everything!\n\nOr type your feedback right here — I'll pass it along! 😊",
    default: "Thanks for your message! 🙏 I can help with:\n\n• 📂 **Projects** — My work & live demos\n• 💪 **Skills** — Tech stack & expertise\n• 💼 **Hire** — Work with me\n• 📅 **Meeting** — Schedule a call\n• 🧘 **Meditation** — Wellness sessions\n• 💝 **Donate** — Support via UPI\n• 📬 **Contact** — Reach me\n\nWhat interests you?",
  },
  hi: {
    greeting: "नमस्कार! 🙏 मैं बिद्याधर का वर्चुअल सहायक हूँ। प्रोजेक्ट्स, स्किल्स, हायरिंग, मीटिंग, ध्यान या दान के बारे में पूछें। कैसे मदद कर सकता हूँ?",
    projects: "बिद्याधर ने कुछ शानदार प्रोजेक्ट्स बनाए हैं!\n\n🚗 **नमस्ते राइड्स** — एक निष्पक्ष राइड-हैलिंग प्लेटफॉर्म\n🕶️ **नेत्रिकXR** — वेब-आधारित AR अनुभव\n📱 **QR कोड मेन्यू** — कॉन्टैक्टलेस ऑर्डरिंग\n🌐 **यह पोर्टफोलियो** — CRM और बहुभाषी सपोर्ट\n\nकिसी के बारे में विस्तार से जानना चाहेंगे?",
    namaste: "🚗 **नमस्ते राइड्स** एक अगली पीढ़ी का राइड-हैलिंग प्लेटफॉर्म है। 24/7 उपलब्धता, ड्राइवरों के लिए कम कमीशन, और स्मार्ट सुरक्षा तकनीक।\n\n🔗 लाइव: https://namaste-ruby.vercel.app/",
    netrik: "🕶️ **नेत्रिकXR** वेब पर ऑगमेंटेड रियलिटी लाता है! कोई ऐप डाउनलोड जरूरी नहीं।\n\n🔗 लाइव: https://web-ar-phi.vercel.app/",
    qr: "📱 **QR कोड मेन्यू** रेस्तरां के लिए प्रीमियम कॉन्टैक्टलेस ऑर्डरिंग सिस्टम है।\n\n🔗 लाइव: https://qr-cod-shop.vercel.app/",
    hire: "बढ़िया! 🎯 शुरू करने के लिए:\n\n1. रजिस्टर पेज पर **खाता बनाएं**\n2. प्रोजेक्ट की जरूरतें बताएं\n3. बिद्याधर जल्द संपर्क करेंगे!\n\n📧 ईमेल: bidyadhar.sahu.cse.2022@nist.edu\n📅 'मीटिंग बुक करें' कहकर मीटिंग लगाएं!",
    skills: "💪 बिद्याधर की तकनीकी दक्षताएं:\n\n**फ्रंटएंड:** React, Next.js, TypeScript, Tailwind\n**बैकएंड:** Node.js, Python, Express\n**क्लाउड:** AWS, Docker\n**Web3:** Solidity, Ethereum\n**AR/VR:** WebAR, Three.js",
    meditation: "🧘 ध्यान और कल्याण सत्र जल्द शुरू हो रहे हैं! लाइव कक्षाएं, श्वास व्यायाम और चक्र हीलिंग शामिल होंगे।",
    donate: "💝 सहयोग करें! UPI से दान करें:\n\n**UPI ID:** bidyadharsahu@ptyes\n\n₹100, ₹500, ₹1,000, ₹5,000 — हर योगदान मायने रखता है!\n\n👉 दान पेज पर जाएं।",
    contact: "📬 बिद्याधर से संपर्क करें:\n\n📧 ईमेल: bidyadhar.sahu.cse.2022@nist.edu\n💻 GitHub: github.com/bidyadharsahu\n📅 'मीटिंग बुक करें' कहें!",
    about: "👨‍💻 **बिद्याधर साहू** ओडिशा, भारत के एक क्लाउड डेवलपर हैं। Web3 से AR तक नवाचारी समाधान बनाते हैं।\n\n🎓 NIST, बरहामपुर\n🛠️ 15+ प्रोजेक्ट्स\n⭐ 5.0 रेटिंग",
    meeting: "📅 **मीटिंग शेड्यूल करें!**\n\nकृपया बताएं:\n1. **आपका नाम**\n2. **पसंदीदा तारीख और समय**\n3. **चर्चा का विषय**\n\n📧 या ईमेल करें: bidyadhar.sahu.cse.2022@nist.edu",
    price: "💰 प्रोजेक्ट मूल्य:\n\n• सरल वेबसाइट: ₹5,000 - ₹15,000\n• फुल-स्टैक ऐप: ₹20,000 - ₹80,000\n• ब्लॉकचेन: ₹30,000 - ₹1,00,000\n• AR/VR: ₹25,000 - ₹75,000\n\n'हायर' या 'मीटिंग बुक करें' कहें!",
    time: "⏱️ प्रोजेक्ट समयसीमा:\n\n• छोटा: 1-2 सप्ताह\n• मध्यम: 3-6 सप्ताह\n• बड़ा: 2-3 महीने",
    thanks: "आपका स्वागत है! 🙏 कुछ और मदद चाहिए?",
    default: "धन्यवाद! 🙏 मैं मदद कर सकता हूँ:\n\n• 📂 **प्रोजेक्ट्स**\n• 💪 **स्किल्स**\n• 💼 **हायर करें**\n• 📅 **मीटिंग**\n• 🧘 **ध्यान**\n• 💝 **दान**\n• 📬 **संपर्क**\n\nक्या जानना चाहेंगे?",
  },
  od: {
    greeting: "ନମସ୍କାର! 🙏 ମୁଁ ବିଦ୍ୟାଧରଙ୍କ ଭର୍ଚୁଆଲ ସହାୟକ। ପ୍ରୋଜେକ୍ଟ, ଦକ୍ଷତା, ନିଯୁକ୍ତ, ସଭା, ଧ୍ୟାନ ବା ଦାନ ବିଷୟରେ ପଚାରନ୍ତୁ।",
    projects: "ବିଦ୍ୟାଧର କିଛି ଅଦ୍ଭୁତ ପ୍ରୋଜେକ୍ଟ ତିଆରି କରିଛନ୍ତି!\n\n🚗 **ନମସ୍ତେ ରାଇଡ୍ସ** — ସମ୍ପୂର୍ଣ୍ଣ ରାଇଡ-ହେଲିଂ ପ୍ଲାଟଫର୍ମ\n🕶️ **ନେତ୍ରିକXR** — ୱେବ ଆଧାରିତ AR\n📱 **QR କୋଡ୍ ମେନୁ** — ସମ୍ପର୍କହୀନ ଅର୍ଡର\n🌐 **ଏହି ପୋର୍ଟଫୋଲିଓ**",
    namaste: "🚗 **ନମସ୍ତେ ରାଇଡ୍ସ** ଏକ ଅଗ୍ରଣୀ ରାଇଡ-ହେଲିଂ ପ୍ଲାଟଫର୍ମ।\n\n🔗 ଲାଇଭ: https://namaste-ruby.vercel.app/",
    netrik: "🕶️ **ନେତ୍ରିକXR** ୱେବରେ AR ଅନୁଭୂତି ଆଣେ!\n\n🔗 ଲାଇଭ: https://web-ar-phi.vercel.app/",
    qr: "📱 **QR କୋଡ୍ ମେନୁ** ରେଷ୍ଟୁରାଣ୍ଟ ପାଇଁ ସମ୍ପର୍କହୀନ ଅର୍ଡର ସିଷ୍ଟମ।\n\n🔗 ଲାଇଭ: https://qr-cod-shop.vercel.app/",
    hire: "ବଢ଼ିଆ! 🎯 ରେଜିଷ୍ଟର ପେଜରେ ଖାତା ତିଆରି କରନ୍ତୁ ଏବଂ ଆବଶ୍ୟକତା ଜଣାନ୍ତୁ।\n\n📧 ଇମେଲ: bidyadhar.sahu.cse.2022@nist.edu",
    skills: "💪 ବିଦ୍ୟାଧରଙ୍କ ଦକ୍ଷତା:\n\nReact, Next.js, TypeScript, Node.js, Python, AWS, Docker, Solidity, WebAR, Supabase",
    meditation: "🧘 ଧ୍ୟାନ ଏବଂ ସୁସ୍ଥତା ସତ୍ର ଶୀଘ୍ର ଆସୁଛି!",
    donate: "💝 UPI ମାଧ୍ୟମରେ ଦାନ କରନ୍ତୁ:\n\n**UPI ID:** bidyadharsahu@ptyes\n\n👉 ଦାନ ପୃଷ୍ଠାକୁ ଯାଆନ୍ତୁ।",
    contact: "📬 ଯୋଗାଯୋଗ:\n📧 bidyadhar.sahu.cse.2022@nist.edu\n💻 GitHub: github.com/bidyadharsahu",
    about: "👨‍💻 **ବିଦ୍ୟାଧର ସାହୁ** ଓଡ଼ିଶାର ଏକ କ୍ଲାଉଡ ଡେଭଲପର। 15+ ପ୍ରୋଜେକ୍ଟ, 5.0 ରେଟିଂ।",
    meeting: "📅 **ସଭା ଯୋଜନା କରନ୍ତୁ!**\n\nଆପଣଙ୍କ ନାମ, ତାରିଖ ଏବଂ ବିଷୟ ଜଣାନ୍ତୁ।\n\n📧 ଇମେଲ: bidyadhar.sahu.cse.2022@nist.edu",
    price: "💰 ପ୍ରୋଜେକ୍ଟ ମୂଲ୍ୟ:\n\n• ସରଳ ୱେବସାଇଟ: ₹5,000 - ₹15,000\n• ଫୁଲ-ଷ୍ଟାକ: ₹20,000 - ₹80,000\n• ବ୍ଲକଚେନ: ₹30,000 - ₹1,00,000",
    time: "⏱️ ସମୟସୀମା:\n• ଛୋଟ: 1-2 ସପ୍ତାହ\n• ମଧ୍ୟମ: 3-6 ସପ୍ତାହ\n• ବଡ: 2-3 ମାସ",
    thanks: "ଆପଣଙ୍କୁ ସ୍ବାଗତ! 🙏 ଆଉ କିଛି ସାହାଯ୍ୟ ଦରକାର?",
    default: "ଧନ୍ୟବାଦ! 🙏 ମୁଁ ସାହାଯ୍ୟ କରିପାରିବି:\n\n• 📂 ପ୍ରୋଜେକ୍ଟ\n• 💪 ଦକ୍ଷତା\n• 💼 ନିଯୁକ୍ତ\n• 📅 ସଭା\n• 🧘 ଧ୍ୟାନ\n• 💝 ଦାନ\n• 📬 ଯୋଗାଯୋଗ\n\nକଣ ଜାଣିବାକୁ ଚାହୁଁଛନ୍ତି?",
  },
  sa: {
    greeting: "नमस्कारः! 🙏 अहं विद्याधरस्य सहायकयन्त्रम् अस्मि। प्रकल्पानां, दक्षतानां, नियुक्तेः, सभायाः, ध्यानस्य वा दानस्य विषये पृच्छन्तु।",
    projects: "विद्याधरः अद्भुतान् प्रकल्पान् निर्मितवान्!\n\n🚗 **नमस्ते राइड्स्**\n🕶️ **नेत्रिकXR** — AR अनुभवाः\n📱 **QR सङ्केतसूची**\n🌐 **एतत् पोर्टफोलियो**",
    namaste: "🚗 **नमस्ते राइड्स्** — अगामी पीढ्याः राइड-हेलिंग व्यासपीठम्।\n\n🔗 https://namaste-ruby.vercel.app/",
    netrik: "🕶️ **नेत्रिकXR** — जालजनितं AR अनुभवम्!\n\n🔗 https://web-ar-phi.vercel.app/",
    qr: "📱 **QR सङ्केतसूची** — भोजनालयेभ्यः सम्पर्कहीन-आदेशव्यवस्था।\n\n🔗 https://qr-cod-shop.vercel.app/",
    hire: "उत्तमम्! 🎯 पञ्जीकरणपृष्ठे खातं रचयन्तु।\n\n📧 bidyadhar.sahu.cse.2022@nist.edu",
    skills: "💪 React, Next.js, TypeScript, Node.js, Python, AWS, Docker, Solidity, WebAR, Supabase",
    meditation: "🧘 ध्यानसत्राणि शीघ्रम् आगच्छन्ति!",
    donate: "💝 UPI माध्यमेन दानं कुर्वन्तु:\n\n**UPI ID:** bidyadharsahu@ptyes",
    contact: "📬 सम्पर्कः:\n📧 bidyadhar.sahu.cse.2022@nist.edu",
    about: "👨‍💻 **विद्याधरः साहुः** — ओडिशातः मेघविकासकः। 15+ प्रकल्पाः, 5.0 मूल्याङ्कनम्।",
    meeting: "📅 **सभां निर्धारयन्तु!**\n\nभवतः नाम, तिथिं विषयं च वदन्तु।\n\n📧 bidyadhar.sahu.cse.2022@nist.edu",
    price: "💰 प्रकल्पमूल्यम्:\n• सरलं जालस्थलम्: ₹5,000 - ₹15,000\n• पूर्णस्टैक: ₹20,000 - ₹80,000",
    thanks: "स्वागतम्! 🙏 किमन्यत् साहाय्यम्?",
    default: "धन्यवादाः! 🙏\n\n• 📂 प्रकल्पाः\n• 💪 दक्षताः\n• 💼 नियुक्तिः\n• 📅 सभा\n• 🧘 ध्यानम्\n• 💝 दानम्\n• 📬 सम्पर्कः\n\nकिं ज्ञातुम् इच्छन्ति?",
  },
};

// Keywords mapped to response keys
const KEYWORD_MAP: Record<string, string[]> = {
  greeting: ['hello', 'hi', 'hey', 'hola', 'namaste', 'namaskar', 'नमस्कार', 'नमस्ते', 'ନମସ୍କାର', 'हाय', 'ହାଏ'],
  projects: ['project', 'work', 'portfolio', 'प्रोजेक्ट', 'काम', 'ପ୍ରୋଜେକ୍ଟ', 'कार्य', 'प्रकल्प'],
  namaste: ['namaste ride', 'carpoo', 'ride sharing', 'ride-hail', 'नमस्ते राइड'],
  netrik: ['netrik', 'ar app', 'augment', 'webxr', 'webar', 'नेत्रिक', 'ନେତ୍ରିକ'],
  qr: ['qr', 'menu', 'restaurant', 'contactless', 'क्यूआर', 'मेन्यू', 'ମେନୁ'],
  hire: ['hire', 'freelanc', 'work with', 'engage', 'हायर', 'नियुक्त', 'ନିଯୁକ୍ତ', 'काम करवाना'],
  skills: ['skill', 'tech', 'stack', 'know', 'language', 'framework', 'स्किल', 'तकनीक', 'ଦକ୍ଷତା', 'दक्षता'],
  meditation: ['meditat', 'yoga', 'mindful', 'wellness', 'ध्यान', 'योग', 'ଧ୍ୟାନ', 'ధ్యాన'],
  donate: ['donat', 'support', 'fund', 'upi', 'pay', 'दान', 'सहयोग', 'ଦାନ'],
  contact: ['contact', 'email', 'reach', 'github', 'linkedin', 'संपर्क', 'ଯୋଗାଯୋଗ', 'सम्पर्क'],
  about: ['about', 'who', 'bidyadhar', 'बिद्याधर', 'ବିଦ୍ୟାଧର', 'विद्याधर', 'परिचय'],
  meeting: ['meeting', 'schedule', 'book', 'call', 'appoint', 'slot', 'मीटिंग', 'सभा', 'बैठक', 'ସଭା', 'ମିଟିଂ', 'बुक'],
  price: ['price', 'cost', 'rate', 'charge', 'budget', 'कीमत', 'मूल्य', 'दाम', 'ମୂଲ୍ୟ'],
  time: ['time', 'deadline', 'delivery', 'duration', 'how long', 'समय', 'ସମୟ'],
  thanks: ['thank', 'thanks', 'thx', 'धन्यवाद', 'शुक्रिया', 'ଧନ୍ୟବାଦ'],
  calendar: ['calendar', 'event', 'schedule', 'कैलेंडर', 'ତାରିଖ', 'पञ्चाङ्ग'],
  livestream: ['live', 'stream', 'broadcast', 'लाइव', 'ଲାଇଭ'],
  feedback: ['feedback', 'review', 'rating', 'प्रतिक्रिया', 'ମତାମତ'],
};

function detectLang(locale: string): Lang {
  if (locale === 'hi') return 'hi';
  if (locale === 'od') return 'od';
  if (locale === 'sa') return 'sa';
  return 'en';
}

function getBotResponse(message: string, lang: Lang): string {
  const lower = message.toLowerCase();

  for (const [key, keywords] of Object.entries(KEYWORD_MAP)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        return RESPONSES[lang][key] || RESPONSES['en'][key] || RESPONSES[lang].default;
      }
    }
  }

  return RESPONSES[lang].default;
}

export async function POST(request: NextRequest) {
  try {
    const { message, locale } = await request.json();
    const lang = detectLang(locale || 'en');
    const response = getBotResponse(message, lang);
    return NextResponse.json({ response });
  } catch {
    return NextResponse.json({ response: "Sorry, I'm having trouble right now. Please try again!" });
  }
}
