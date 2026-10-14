/// <reference types="astro/client" />

declare module 'cloudflare:workers' {
	export const env: {
		SUPABASE_URL?: string;
		SUPABASE_SERVICE_ROLE_KEY?: string;
		[key: string]: unknown;
	};
}

interface ImportMetaEnv {
	readonly PUBLIC_WHATSAPP?: string;
	readonly SUPABASE_URL?: string;
	readonly SUPABASE_SERVICE_ROLE_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
