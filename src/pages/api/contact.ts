import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { contactSchema } from '../../lib/contactSchema';

export const prerender = false;

function getEnv() {
	return {
		url: env.SUPABASE_URL ?? import.meta.env.SUPABASE_URL,
		key: env.SUPABASE_SERVICE_ROLE_KEY ?? import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
	};
}

export const POST: APIRoute = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'JSON inválido' }), { status: 400 });
	}

	const parsed = contactSchema.safeParse(body);
	if (!parsed.success) {
		return new Response(
			JSON.stringify({ error: 'Dados inválidos', issues: parsed.error.issues }),
			{ status: 422 },
		);
	}

	const { url, key } = getEnv();
	if (!url || !key) {
		return new Response(
			JSON.stringify({ error: 'Serviço de contato não configurado' }),
			{ status: 500 },
		);
	}

	const { nome, email, telefone, empresa, interesse, mensagem, origem } = parsed.data;

	const res = await fetch(`${url}/rest/v1/leads`, {
		method: 'POST',
		headers: {
			apikey: key,
			Authorization: `Bearer ${key}`,
			'Content-Type': 'application/json',
			Prefer: 'return=minimal',
		},
		body: JSON.stringify({
			nome,
			email,
			telefone: telefone || null,
			empresa: empresa || null,
			interesse,
			mensagem,
			origem: origem || 'site',
		}),
	});

	if (!res.ok) {
		return new Response(
			JSON.stringify({ error: 'Falha ao registrar contato' }),
			{ status: 502 },
		);
	}

	return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
