/// <reference types="astro/client" />

declare module 'cloudflare:workers' {
	export const env: {
		LEADS_EMAIL?: string;
		SEND_EMAIL?: {
			send(message: unknown): Promise<void>;
		};
		[key: string]: unknown;
	};
}

declare module 'cloudflare:email' {
	export class EmailMessage {
		constructor(from: string, to: string, raw: string);
	}
}

interface ImportMetaEnv {
	readonly PUBLIC_WHATSAPP?: string;
	readonly LEADS_EMAIL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
