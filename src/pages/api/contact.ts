import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage, Mailbox } from 'mimetext';
import { contactSchema } from '../../lib/contactSchema';

export const prerender = false;

const FROM = { name: 'Site RP7 Tech', addr: 'contato@rp7.tech' };

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

	const destination = env.LEADS_EMAIL;
	if (!destination || !env.SEND_EMAIL) {
		return new Response(
			JSON.stringify({ error: 'Serviço de contato não configurado' }),
			{ status: 500 },
		);
	}

	const { nome, email, telefone, empresa, interesse, mensagem, origem } = parsed.data;

	const text = [
		`Novo contato pelo site rp7.tech`,
		``,
		`Nome: ${nome}`,
		`E-mail: ${email}`,
		telefone ? `Telefone: ${telefone}` : null,
		empresa ? `Empresa: ${empresa}` : null,
		`Interesse: ${interesse}`,
		`Origem: ${origem || 'site'}`,
		``,
		`Mensagem:`,
		mensagem,
	]
		.filter((line) => line !== null)
		.join('\n');

	const msg = createMimeMessage();
	msg.setSender(FROM);
	msg.setRecipient(destination);
	msg.setSubject(`[rp7.tech] ${interesse} — ${nome}`);
	msg.setHeader('Reply-To', new Mailbox({ addr: email, name: nome }));
	msg.addMessage({ contentType: 'text/plain', charset: 'utf-8', data: text });

	try {
		await env.SEND_EMAIL.send(new EmailMessage(FROM.addr, destination, msg.asRaw()));
	} catch {
		return new Response(
			JSON.stringify({ error: 'Falha ao enviar mensagem' }),
			{ status: 502 },
		);
	}

	return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
