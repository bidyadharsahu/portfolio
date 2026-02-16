'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const ChatWidget = () => {
  const { chatOpen, setChatOpen, locale } = useAppStore();

  const getGreeting = (lang: string) => {
    const greetings: Record<string, string> = {
      en: "Namaskar! 🙏 I'm Bidyadhar's virtual assistant. Ask me about projects, skills, hiring, meetings, meditation, or donations. How can I help?",
      hi: "नमस्कार! 🙏 मैं बिद्याधर का सहायक हूँ। प्रोजेक्ट्स, स्किल्स, मीटिंग, ध्यान या दान के बारे में पूछें!",
      od: "ନମସ୍କାର! 🙏 ମୁଁ ବିଦ୍ୟାଧରଙ୍କ ସହାୟକ। ପ୍ରୋଜେକ୍ଟ, ଦକ୍ଷତା, ସଭା ବା ଦାନ ବିଷୟରେ ପଚାରନ୍ତୁ!",
      sa: "नमस्कारः! 🙏 अहं विद्याधरस्य सहायकम्। प्रकल्पानां, दक्षतानां, सभायाः वा विषये पृच्छन्तु!",
    };
    return greetings[lang] || greetings.en;
  };

  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: getGreeting(locale) },
  ]);

  // Reset greeting when locale changes
  useEffect(() => {
    setMessages([{ role: 'bot', content: getGreeting(locale) }]);
  }, [locale]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, locale }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'bot', content: data.response }]);
    } catch {
      const errMsg: Record<string, string> = {
        en: "Sorry, I'm having trouble right now. Please try again!",
        hi: "क्षमा करें, अभी समस्या हो रही है। कृपया पुनः प्रयास करें!",
        od: "କ୍ଷମା କରନ୍ତୁ, ସମସ୍ୟା ହେଉଛି। ପୁନଃ ଚେଷ୍ଟା କରନ୍ତୁ!",
        sa: "क्षम्यताम्, समस्या वर्तते। पुनः प्रयतन्ताम्!",
      };
      setMessages((prev) => [...prev, { role: 'bot', content: errMsg[locale] || errMsg.en }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 btn btn-primary btn-circle btn-lg shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] flex flex-col bg-base-100 border border-base-300 rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{t('chat.title', locale)}</h3>
                <p className="text-white/60 text-xs">Online</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="btn btn-ghost btn-sm btn-circle text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-primary/20' : 'bg-secondary/20'
                  }`}>
                    {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-primary" /> : <Bot className="w-3.5 h-3.5 text-secondary" />}
                  </div>
                  <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                    <p className="text-sm leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" class="underline text-primary">$1</a>')
                    }} />
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-bubble-bot">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-base-content/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-base-content/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-base-content/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-base-300">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder', locale)}
                className="input input-bordered input-sm flex-1 bg-base-200/50 focus:bg-base-100"
              />
              <button type="submit" disabled={loading || !input.trim()} className="btn btn-primary btn-sm btn-circle">
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
