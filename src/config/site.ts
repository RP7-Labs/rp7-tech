export const site = {
	name: 'RP7 Tech',
	tagline: 'Soluções digitais que geram resultados',
	description:
		'Software house que desenvolve soluções digitais sob medida: sistemas integrados, integrações entre sistemas, aplicativos mobile e produtos para hotelaria e imobiliárias.',
	url: 'https://rp7.tech',
	email: 'contato@rp7.tech',
	phone: '+55 00 00000-0000',
	whatsapp: import.meta.env.PUBLIC_WHATSAPP ?? '5500000000000',
	cnpj: '00.000.000/0000-00',
	address: '',
	social: {
		linkedin: '',
		instagram: '',
		github: '',
	},
} as const;

export const interests = [
	{ value: 'software-personalizado', label: 'Software personalizado' },
	{ value: 'sistemas-integrados', label: 'Sistemas integrados' },
	{ value: 'integracoes', label: 'Integrações' },
	{ value: 'app-mobile', label: 'App mobile' },
	{ value: 'hotelaria', label: 'Hotelaria' },
	{ value: 'imobiliarias', label: 'Imobiliárias' },
	{ value: 'outro', label: 'Outro' },
] as const;

export function whatsappLink(message?: string) {
	const base = `https://wa.me/${site.whatsapp}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
