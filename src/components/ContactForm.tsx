import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { contactSchema, interestValues, type ContactInput } from '../lib/contactSchema';
import { interests } from '../config/site';

const interestLabels = new Map<string, string>(
	interests.map((i) => [i.value, i.label]),
);

interface Props {
	origem?: string;
	defaultInterest?: (typeof interestValues)[number];
	submitLabel?: string;
}

const inputClass =
	'w-full rounded-xl border border-light bg-white px-4 py-3 text-sm text-dark placeholder:text-slate-text/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
const errorClass = 'mt-1 text-xs text-red-600';

export default function ContactForm({ origem, defaultInterest, submitLabel = 'Enviar mensagem' }: Props) {
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactInput>({
		resolver: standardSchemaResolver(contactSchema),
		defaultValues: {
			interesse: defaultInterest,
			origem: origem ?? '',
		},
	});

	async function onSubmit(data: ContactInput) {
		setStatus('idle');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error(await res.text());
			setStatus('success');
			reset();
		} catch {
			setStatus('error');
		}
	}

	if (status === 'success') {
		return (
			<div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
				<p className="text-lg font-semibold text-dark">Mensagem enviada!</p>
				<p className="mt-2 text-sm text-slate-text">
					Recebemos seu contato e retornamos em breve. Se preferir, fale agora mesmo pelo WhatsApp.
				</p>
				<button
					type="button"
					onClick={() => setStatus('idle')}
					className="mt-5 text-sm font-semibold text-primary hover:underline"
				>
					Enviar outra mensagem
				</button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
			<input type="hidden" {...register('origem')} />
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-dark">
						Nome *
					</label>
					<input id="nome" type="text" autoComplete="name" className={inputClass} {...register('nome')} />
					{errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
				</div>
				<div>
					<label htmlFor="email" className="mb-1.5 block text-sm font-medium text-dark">
						E-mail *
					</label>
					<input id="email" type="email" autoComplete="email" className={inputClass} {...register('email')} />
					{errors.email && <p className={errorClass}>{errors.email.message}</p>}
				</div>
				<div>
					<label htmlFor="telefone" className="mb-1.5 block text-sm font-medium text-dark">
						Telefone
					</label>
					<input id="telefone" type="tel" autoComplete="tel" className={inputClass} {...register('telefone')} />
					{errors.telefone && <p className={errorClass}>{errors.telefone.message}</p>}
				</div>
				<div>
					<label htmlFor="empresa" className="mb-1.5 block text-sm font-medium text-dark">
						Empresa
					</label>
					<input id="empresa" type="text" autoComplete="organization" className={inputClass} {...register('empresa')} />
					{errors.empresa && <p className={errorClass}>{errors.empresa.message}</p>}
				</div>
			</div>

			<div>
				<label htmlFor="interesse" className="mb-1.5 block text-sm font-medium text-dark">
					Interesse *
				</label>
				<select id="interesse" className={inputClass} {...register('interesse')}>
					<option value="">Selecione...</option>
					{interestValues.map((v) => (
						<option key={v} value={v}>
							{interestLabels.get(v) ?? v}
						</option>
					))}
				</select>
				{errors.interesse && <p className={errorClass}>{errors.interesse.message}</p>}
			</div>

			<div>
				<label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-dark">
					Mensagem *
				</label>
				<textarea
					id="mensagem"
					rows={4}
					className={inputClass}
					placeholder="Conte o que você precisa..."
					{...register('mensagem')}
				/>
				{errors.mensagem && <p className={errorClass}>{errors.mensagem.message}</p>}
			</div>

			{status === 'error' && (
				<p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
					Não foi possível enviar. Tente novamente ou fale conosco pelo WhatsApp.
				</p>
			)}

			<button
				type="submit"
				disabled={isSubmitting}
				className="brand-gradient w-full rounded-xl px-6 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
			>
				{isSubmitting ? 'Enviando...' : submitLabel}
			</button>
		</form>
	);
}
