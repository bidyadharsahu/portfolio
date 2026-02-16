import { NextRequest, NextResponse } from 'next/server';

const BOT_RESPONSES: Record<string, string> = {
  hello: "Namaste! 🙏 I'm Bidyadhar's virtual assistant. How can I help you today?",
  hi: "Hello there! Welcome to Bidyadhar's portfolio. What would you like to know?",
  projects: "Bidyadhar has worked on exciting projects like Namaste Rides (ride-sharing), NetrikXR (AR app), and QR Code Menu Ordering System. Would you like to know more about any of them?",
  namaste: "Namaste Rides is a blockchain-based carpooling/ride-sharing platform that connects drivers with passengers in a decentralized way. It features smart contracts for secure payments and ride tracking.",
  netrik: "NetrikXR is an augmented reality application that brings immersive AR experiences to mobile devices. It combines cutting-edge AR technology with practical real-world applications.",
  qr: "The QR Code Menu Ordering System is a contactless solution for restaurants that allows customers to scan a QR code, browse the menu, and place orders directly from their phones.",
  hire: "Great! You can reach out to Bidyadhar via email at bidyadhar.sahu.cse.2022@nist.edu or create an account and describe your project requirements. He'd love to work with you!",
  skills: "Bidyadhar is skilled in: React, Next.js, Node.js, Python, Solidity, AWS, Blockchain, AR/VR, and more. He's a full-stack developer with expertise in Web3 and cloud technologies.",
  meditation: "We offer guided meditation sessions that you can join by registering on the platform. Check our Meditation section for upcoming classes and their schedules!",
  donate: "If you'd like to support Bidyadhar's work and open-source contributions, you can visit the Donate section. Every contribution helps fuel innovation!",
  contact: "You can reach Bidyadhar at bidyadhar.sahu.cse.2022@nist.edu, through GitHub (bidyadharsahu), or LinkedIn. You can also schedule a meeting through the Calendar section!",
  about: "Bidyadhar Sahu is a cloud developer and blockchain enthusiast from Odisha, India. He specializes in building innovative solutions from Web3 to AR applications. He's passionate about leveraging technology for social good.",
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  
  if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
    return "Project pricing varies based on complexity and scope. Please create an account and describe your requirements, and Bidyadhar will get back to you with a detailed quote!";
  }
  
  if (lower.includes('time') || lower.includes('deadline') || lower.includes('delivery')) {
    return "Project timelines depend on the scope and complexity. Typically, small projects take 1-2 weeks, medium 3-6 weeks, and large projects 2-3 months. Let's discuss your specific needs!";
  }

  if (lower.includes('thank')) {
    return "You're welcome! 🙏 Is there anything else I can help you with?";
  }

  return "Thanks for your message! I'm Bidyadhar's assistant. I can help with info about projects, skills, hiring, meditation classes, or donations. What interests you?";
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const response = getBotResponse(message);
    return NextResponse.json({ response });
  } catch {
    return NextResponse.json({ response: "Sorry, I'm having trouble right now. Please try again!" });
  }
}
