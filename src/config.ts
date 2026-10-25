// Edit these in .env (see .env.example) or directly here.
const env = import.meta.env;

export const WHATSAPP_NUMBER: string = env.VITE_WHATSAPP_NUMBER || '447000000000';
export const PHONE_DISPLAY: string = env.VITE_PHONE_DISPLAY || '020 8000 0000';
export const EMAIL_ADDRESS: string = env.VITE_EMAIL || 'sales@sofazilla.co.uk';
export const FB_LINK: string = env.VITE_FACEBOOK_URL || 'https://facebook.com/sofazilla';
// The part after m.me/ in your Facebook Page's Messenger link
export const MESSENGER_USERNAME: string = env.VITE_MESSENGER_USERNAME || 'sofazilla';
export const MESSENGER_URL = `https://m.me/${MESSENGER_USERNAME}`;
