-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Apps table
create table public.apps (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    description text,
    libraries text[] not null default '{}',
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- API Keys table
create table public.api_keys (
    id uuid default uuid_generate_v4() primary key,
    app_id uuid references public.apps(id) on delete cascade not null,
    key_id text not null unique,
    key_prefix text not null,
    name text not null,
    created_at timestamptz default now() not null,
    last_used_at timestamptz,
    expires_at timestamptz
);

-- Indexes
create index apps_user_id_idx on public.apps(user_id);
create index api_keys_app_id_idx on public.api_keys(app_id);
create index api_keys_key_id_idx on public.api_keys(key_id);

-- Row Level Security (RLS)
alter table public.apps enable row level security;
alter table public.api_keys enable row level security;

-- Apps policies
create policy "Users can view their own apps"
    on public.apps for select
    using (auth.uid() = user_id);

create policy "Users can create their own apps"
    on public.apps for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own apps"
    on public.apps for update
    using (auth.uid() = user_id);

create policy "Users can delete their own apps"
    on public.apps for delete
    using (auth.uid() = user_id);

-- API Keys policies
create policy "Users can view API keys for their apps"
    on public.api_keys for select
    using (
        exists (
            select 1 from public.apps
            where apps.id = api_keys.app_id
            and apps.user_id = auth.uid()
        )
    );

create policy "Users can create API keys for their apps"
    on public.api_keys for insert
    with check (
        exists (
            select 1 from public.apps
            where apps.id = api_keys.app_id
            and apps.user_id = auth.uid()
        )
    );

create policy "Users can delete API keys for their apps"
    on public.api_keys for delete
    using (
        exists (
            select 1 from public.apps
            where apps.id = api_keys.app_id
            and apps.user_id = auth.uid()
        )
    );

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Trigger for apps updated_at
create trigger handle_apps_updated_at
    before update on public.apps
    for each row
    execute function public.handle_updated_at();