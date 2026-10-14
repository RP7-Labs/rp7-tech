create table if not exists public.leads (
	id uuid primary key default gen_random_uuid(),
	created_at timestamptz not null default now(),
	nome text not null,
	email text not null,
	telefone text,
	empresa text,
	interesse text not null,
	mensagem text not null,
	origem text
);

alter table public.leads enable row level security;
