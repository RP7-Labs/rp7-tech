import { z } from 'zod';

export const interestValues = [
	'software-personalizado',
	'sistemas-integrados',
	'integracoes',
	'app-mobile',
	'hotelaria',
	'imobiliarias',
	'outro',
] as const;

export const contactSchema = z.object({
	nome: z.string().trim().min(2, 'Informe seu nome').max(120),
	email: z.email('Informe um e-mail válido').max(160),
	telefone: z.string().trim().max(20).optional().or(z.literal('')),
	empresa: z.string().trim().max(120).optional().or(z.literal('')),
	interesse: z.enum(interestValues, 'Selecione um interesse'),
	mensagem: z
		.string()
		.trim()
		.min(10, 'Conte um pouco mais sobre o que você precisa')
		.max(2000),
	origem: z.string().trim().max(60).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
