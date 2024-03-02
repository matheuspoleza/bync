INSERT INTO storage.buckets (
    id,
    name,
    owner,
    created_at,
    updated_at,
    public,
    file_size_limit,
    allowed_mime_types,
    owner_id
) VALUES (
    'sessions_data',
    'sessions_data',
    NULL,
    '2024-01-24 01:39:36+00',
    '2024-01-24 01:39:36+00',
    TRUE,
    NULL,
    NULL,
    NULL
);

INSERT into public.customers (
    id,
    full_name,
    created_at
) VALUES (
    'b66f3403-befb-46ab-9dc1-08c1105dac06',
    'Matheus Alexandre Poleza',
    '2024-01-24 01:08:46+00'
)
