import type { Lang } from "../domain/types";

// Pre-approved customer message templates. Facts are always filled in by code.
// These are used for system notices and as the safe fallback when an AI draft fails validation.

type TemplateKey =
  | "confirmed" | "notice" | "notice_ack" | "clarify" | "which_option" | "offer1" | "offer2"
  | "released" | "released_duplicate" | "released_original_only" | "released_no_option" | "released_generic"
  | "rescued" | "seat_lost" | "pending" | "question_ack"
  | "holding" | "not_confirmed" | "refund_on_way";

const TEMPLATES: Record<TemplateKey, Record<Lang, string>> = {
  // Sent automatically when the bank confirms a late payment, before anyone has decided anything.
  confirmed: {
    en: "Hi {{NAME}}, your bank has now confirmed your payment of {{AMOUNT}} to Clay & Co. for {{ORIGINAL}}. It came through after your booking had timed out, so we're checking it. Your money is safe, and we'll update you soon.",
    "en-hi": "Hi {{NAME}}, aapke bank ne {{ORIGINAL}} ke liye Clay & Co. ko {{AMOUNT}} ka payment ab confirm kar diya hai. Yeh booking time out hone ke baad aaya, isliye hum check kar rahe hain. Aapka paisa safe hai, hum jaldi update denge.",
    hi: "नमस्ते {{NAME}}, आपके बैंक ने {{ORIGINAL}} के लिए Clay & Co. को {{AMOUNT}} का भुगतान अब कन्फ़र्म कर दिया है। यह बुकिंग का समय निकलने के बाद आया, इसलिए हम इसे जाँच रहे हैं। आपका पैसा सुरक्षित है, हम जल्द बताएँगे।",
  },
  // Reply when the customer has already written to us.
  notice_ack: {
    en: "Thanks for your message, {{NAME}}, and sorry for the trouble. The seat you paid for was taken before your payment came through, but your {{AMOUNT}} is safe. We're finding the best option for you now.",
    "en-hi": "Message ke liye thanks, {{NAME}}, aur takleef ke liye sorry. Aapka payment aane se pehle woh seat book ho gayi, par aapke {{AMOUNT}} safe hain. Hum abhi aapke liye best option dhoondh rahe hain.",
    hi: "संदेश के लिए धन्यवाद {{NAME}}, और असुविधा के लिए खेद है। आपका भुगतान आने से पहले वह सीट भर गई, पर आपके {{AMOUNT}} सुरक्षित हैं। हम अभी आपके लिए सबसे अच्छा विकल्प ढूँढ रहे हैं।",
  },
  which_option: {
    en: "Thanks {{NAME}}! Which one would you like: {{SESSION_1}} or {{SESSION_2}}? Or we can do a full refund instead.",
    "en-hi": "Thanks {{NAME}}! Aapko kaunsa chahiye: {{SESSION_1}} ya {{SESSION_2}}? Ya phir full refund.",
    hi: "धन्यवाद {{NAME}}! आपको कौन सा चाहिए: {{SESSION_1}} या {{SESSION_2}}? या फिर पूरा रिफ़ंड।",
  },
  notice: {
    en: "Hi {{NAME}}, sorry: the seat for {{ORIGINAL}} was taken before your payment came through. Your {{AMOUNT}} is safe. Would you like another session, or a full refund? Tell us what works for you.",
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
  // The customer already holds a seat through an earlier payment.
  released_duplicate: {
    en: "Hi {{NAME}}, good news: your seat for {{ORIGINAL}} is already booked with your earlier payment, so you don't need this one. We won't keep this second payment of {{AMOUNT}}. It will be returned automatically by {{DEADLINE}} (it can take a few working days to show).",
    "en-hi": "Hi {{NAME}}, achhi khabar: {{ORIGINAL}} ke liye aapki seat pehle wale payment se already booked hai, isliye yeh payment zaroori nahi. Hum yeh doosra {{AMOUNT}} ka payment nahi rakhenge. Yeh {{DEADLINE}} tak automatically wapas aa jayega (dikhne mein kuch working days lag sakte hain).",
    hi: "नमस्ते {{NAME}}, अच्छी ख़बर: {{ORIGINAL}} के लिए आपकी सीट पहले वाले भुगतान से पहले ही बुक है, इसलिए इसकी ज़रूरत नहीं। हम यह दूसरा {{AMOUNT}} का भुगतान नहीं रखेंगे। यह {{DEADLINE}} तक अपने आप वापस हो जाएगा (दिखने में कुछ कार्य-दिवस लग सकते हैं)।",
  },
  // The customer will only take the original class, which is full.
  released_original_only: {
    en: "Sorry {{NAME}}, the class you wanted ({{ORIGINAL}}) is now full, so we won't keep your payment. Your {{AMOUNT}} will be returned automatically by {{DEADLINE}} (it can take a few working days to show).",
    "en-hi": "Sorry {{NAME}}, aapki chahi hui class ({{ORIGINAL}}) ab full hai, isliye hum aapka payment nahi rakhenge. Aapka {{AMOUNT}} {{DEADLINE}} tak automatically wapas aa jayega (dikhne mein kuch working days lag sakte hain).",
    hi: "माफ़ कीजिए {{NAME}}, आपकी चाही हुई क्लास ({{ORIGINAL}}) अब भर चुकी है, इसलिए हम आपका भुगतान नहीं रखेंगे। आपके {{AMOUNT}} {{DEADLINE}} तक अपने आप वापस हो जाएँगे (दिखने में कुछ कार्य-दिवस लग सकते हैं)।",
  },
  // No session fits what the customer asked for.
  released_no_option: {
    en: "Sorry {{NAME}}, we couldn't find another session that fits what you asked for, so we won't keep your payment. Your {{AMOUNT}} will be returned automatically by {{DEADLINE}} (it can take a few working days to show).",
    "en-hi": "Sorry {{NAME}}, aapki zaroorat ke hisaab se koi aur session nahi mila, isliye hum aapka payment nahi rakhenge. Aapka {{AMOUNT}} {{DEADLINE}} tak automatically wapas aa jayega (dikhne mein kuch working days lag sakte hain).",
    hi: "माफ़ कीजिए {{NAME}}, आपकी ज़रूरत के हिसाब से कोई दूसरा सेशन नहीं मिला, इसलिए हम आपका भुगतान नहीं रखेंगे। आपके {{AMOUNT}} {{DEADLINE}} तक अपने आप वापस हो जाएँगे (दिखने में कुछ कार्य-दिवस लग सकते हैं)।",
  },
  // Any other release, e.g. decided by the studio owner.
  released_generic: {
    en: "Hi {{NAME}}, we won't be keeping this payment. Your {{AMOUNT}} will be returned automatically by {{DEADLINE}} (it can take a few working days to show). Sorry for the trouble.",
    "en-hi": "Hi {{NAME}}, hum yeh payment nahi rakhenge. Aapka {{AMOUNT}} {{DEADLINE}} tak automatically wapas aa jayega (dikhne mein kuch working days lag sakte hain). Takleef ke liye sorry.",
    hi: "नमस्ते {{NAME}}, हम यह भुगतान नहीं रखेंगे। आपके {{AMOUNT}} {{DEADLINE}} तक अपने आप वापस हो जाएँगे (दिखने में कुछ कार्य-दिवस लग सकते हैं)। असुविधा के लिए खेद है।",
  },
  // The case needs the studio owner (or a restore approval) before anything else happens.
  holding: {
    en: "Thanks for getting in touch, {{NAME}}. The studio team is looking into your booking and will get back to you shortly. Your money is safe.",
    "en-hi": "Message ke liye thanks, {{NAME}}. Studio team aapki booking check kar rahi hai aur jaldi reply karegi. Aapka paisa safe hai.",
    hi: "संपर्क करने के लिए धन्यवाद {{NAME}}। स्टूडियो टीम आपकी बुकिंग देख रही है और जल्द जवाब देगी। आपका पैसा सुरक्षित है।",
  },
  // The bank has not confirmed the payment at all.
  not_confirmed: {
    en: "Thanks, {{NAME}}. Your bank hasn't confirmed this payment to Clay & Co., so nothing has been charged. If any amount is on hold, your bank will return it automatically. If the payment does go through later, we'll be in touch.",
    "en-hi": "Thanks, {{NAME}}. Aapke bank ne yeh payment Clay & Co. ko confirm nahi kiya hai, isliye kuch charge nahi hua. Agar koi amount hold par hai to bank use automatically wapas kar dega. Agar payment baad mein aata hai to hum batayenge.",
    hi: "धन्यवाद {{NAME}}। आपके बैंक ने यह भुगतान Clay & Co. को कन्फ़र्म नहीं किया है, इसलिए कुछ भी चार्ज नहीं हुआ। अगर कोई राशि होल्ड पर है तो बैंक उसे अपने आप लौटा देगा। अगर भुगतान बाद में आता है तो हम बताएँगे।",
  },
  // A refund is already under way.
  refund_on_way: {
    en: "Thanks, {{NAME}}. Your refund is already on its way, so we won't charge you and there's nothing more you need to do.",
    "en-hi": "Thanks, {{NAME}}. Aapka refund already process ho raha hai, isliye hum charge nahi karenge aur aapko kuch aur karne ki zaroorat nahi.",
    hi: "धन्यवाद {{NAME}}। आपका रिफ़ंड पहले से प्रक्रिया में है, इसलिए हम कुछ चार्ज नहीं करेंगे और आपको कुछ और करने की ज़रूरत नहीं।",
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
