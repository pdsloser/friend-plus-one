insert into public.categories (name, slug, sort_order)
values
  ('數位遊戲', 'digital-games', 10),
  ('VTuber', 'vtuber', 20),
  ('出版與內容', 'publishing-content', 30),
  ('活動企劃', 'event-planning', 40),
  ('自由工作者', 'freelancers', 50),
  ('插畫與視覺創作', 'illustration-visual', 60),
  ('其他', 'other', 999)
on conflict (slug) do update
set
  name = excluded.name,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.cover_templates (name, image_url, sort_order)
values
  ('朋友加一官方主視覺', '/assets/brand/friend-plus-one.svg', 10)
on conflict do nothing;
