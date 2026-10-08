import type { Lang } from "../domain/types";

// Pre-approved customer message templates. Facts are always filled in by code.
// These are used for system notices and as the safe fallback when an AI draft fails validation.

type TemplateKey =
  | "notice" | "clarify" | "which_option" | "offer1" | "offer2" | "released" | "rescued" | "seat_lost" | "pending" | "question_ack";

const TEMPLATES: Record<TemplateKey, Record<Lang, string>> = {
  which_option: {
    en: "Thanks {{NAME}}! Which one would you like: {{SESSION_1}} or {{SESSION_2}}? Or we can do a full refund instead.",
    "en-hi": "Thanks {{NAME}}! Aapko kaunsa chahiye: {{SESSION_1}} ya {{SESSION_2}}? Ya phir full refund.",
    hi: "धन्यवाद {{NAME}}! आपको कौन सा चाहिए: {{SESSION_1}} या {{SESSION_2}}? या फिर पूरा रिफ़ंड।",
  },
  notice: {
    en: "Hi {{NAME}}, your payment of {{AMOUNT}} for {{ORIGINAL}} was confirmed late by your bank, and the seat was taken in the meantime. Your money is safe. Would you like another session, or a full refund? Tell us what works for you.",
    "en-hi": "Hi {{NAME}}, aapka {{AMOUNT}} ka payment {{ORIGINAL}} ke liye bank se late confirm hua, aur tab tak seat book ho gayi. Aapka paisa safe hai. Kya aap koi aur session lena chahenge, ya full refund? Batayiye kya suit karega.",
    hi: "नमस्ते {{NAME}}, {{ORIGINAL}} के लिए आपका {{AMOUNT}} का भुगतान बैंक से देर से कन्फ़र्म हुआ और तब तक सीट भर गई। आपका पैसा सुरक्षित है। क्या आप कोई दूसरा सेशन लेना चाहेंगे या पूरा रिफ़ंड? बताइए आपके लिए क्या ठीक रहेगा।",
  },
  clarify: {
    en: "Thanks {{NAME}}! Just to be sure: would you like us to find you another session (tell us which days or times suit you), or would you prefer a full refund of {{AMOUNT}}?",
    "en-hi": "Thanks {{NAME}}! Bas confirm kar dijiye: kya aapke liye koi aur session dhoondein (kaunse din ya time suit karenge), ya {{AMOUNT}} ka full refund chahiye?",
    hi: "धन्यवाद {{NAME}}! बस इतना बता दीजिए: क्या हम आपके लिए दूसरा सेशन ढूँढें (कौन से दिन या समय ठीक रहेंगे), या आप {{AMOUNT}} का पूरा रिफ़ंड चाहेंगे?",
  },
  offer1: {
    en: "Hi {{NAME}}, we can move you to {{SESSION_1}} at no extra charge, using your existing payment of {{AMOUNT}}. If that doesn't suit you, a full refund is available instead.",
    "en-hi": "Hi {{NAME}}, hum aapko {{SESSION_1}} mein shift kar sakte hain, bina kisi extra charge ke, aapke {{AMOUNT}} ke payment se. Agar suit na kare to full refund bhi mil sakta hai.",
    hi: "नमस्ते {{NAME}}, हम आपको {{SESSION_1}} में बिना किसी अतिरिक्त शुल्क के शिफ़्ट कर सकते हैं। अगर यह ठीक न लगे तो पूरा रिफ़ंड भी मिल सकता है।",
  },
  offer2: {
    en: "Hi {{NAME}}, we can move you to {{SESSION_1}} or {{SESSION_2}} at no extra charge, using your existing payment of {{AMOUNT}}. If neither suits you, a full refund is available instead.",
    "en-hi": "Hi {{NAME}}, hum aapko {{SESSION_1}} ya {{SESSION_2}} mein shift kar sakte hain, bina extra charge ke. Agar dono suit na karein to full refund bhi mil sakta hai.",
    hi: "नमस्ते {{NAME}}, हम आपको {{SESSION_1}} या {{SESSION_2}} में बिना अतिरिक्त शुल्क के शिफ़्ट कर सकते हैं। अगर दोनों ठीक न लगें तो पूरा रिफ़ंड भी मिल सकता है।",
  },
  released: {
    en: "Understood, {{NAME}}. We won't keep your payment. The {{AMOUNT}} held by your bank will be returned automatically by {{DEADLINE}} (it can take a few working days to show). Sorry for the trouble.",
    "en-hi": "Samajh gaye, {{NAME}}. Hum aapka payment nahi rakhenge. Aapka {{AMOUNT}} {{DEADLINE}} tak automatically wapas aa jayega (account mein dikhne mein kuch working days lag sakte hain). Takleef ke liye sorry.",
    hi: "समझ गए, {{NAME}}। हम आपका भुगतान नहीं रखेंगे। आपके {{AMOUNT}} {{DEADLINE}} तक अपने आप वापस हो जाएँगे (खाते में दिखने में कुछ कार्य-दिवस लग सकते हैं)। असुविधा के लिए खेद है।",
  },
  rescued: {
    en: "You're booked, {{NAME}}! {{SESSION_1}} is confirmed, paid with your existing {{AMOUNT}}. See you at the wheel.",
    "en-hi": "Booking confirm, {{NAME}}! {{SESSION_1}} pakka hai, aapke {{AMOUNT}} ke payment se. Milte hain!",
    hi: "बुकिंग कन्फ़र्म, {{NAME}}! {{SESSION_1}} पक्का है, आपके {{AMOUNT}} के भुगतान से। जल्द मिलते हैं!",
  },
  seat_lost: {
    en: "Sorry {{NAME}}, that seat was just taken by someone else before we could lock it. Your money is still safe; we're checking the next best option for you.",
    "en-hi": "Sorry {{NAME}}, woh seat abhi kisi aur ne le li. Aapka paisa safe hai; hum agla best option check kar rahe hain.",
    hi: "माफ़ कीजिए {{NAME}}, वह सीट अभी किसी और ने ले ली। आपका पैसा सुरक्षित है; हम अगला सबसे अच्छा विकल्प देख रहे हैं।",
  },
  pending: {
    en: "Thanks {{NAME}}, we're finalising your booking and will confirm shortly. Your money is safe.",
    "en-hi": "Thanks {{NAME}}, hum aapki booking finalise kar rahe hain, jaldi confirm karenge. Aapka paisa safe hai.",
    hi: "धन्यवाद {{NAME}}, हम आपकी बुकिंग पूरी कर रहे हैं और जल्द कन्फ़र्म करेंगे। आपका पैसा सुरक्षित है।",
  },
  question_ack: {
    en: "Good question, {{NAME}}. The studio team will reply to you shortly. Your offer stays open until {{DEADLINE}}.",
    "en-hi": "Achha sawaal, {{NAME}}. Studio team jaldi reply karegi. Aapka offer {{DEADLINE}} tak open hai.",
    hi: "अच्छा सवाल, {{NAME}}। स्टूडियो टीम जल्द जवाब देगी। आपका ऑफ़र {{DEADLINE}} तक खुला है।",
  },
};

export function template(key: TemplateKey, lang: Lang): string {
  return TEMPLATES[key][lang] ?? TEMPLATES[key].en;
}

export function fillPlaceholders(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{\s*([A-Z_0-9]+)\s*\}\}/g, (whole, key: string) => vars[key] ?? whole);
}
