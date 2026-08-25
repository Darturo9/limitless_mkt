-- Gallery media support: preserve existing image records while allowing one
-- image or MP4 video per project.

ALTER TABLE public.gallery_items
  ADD COLUMN media_type text NOT NULL DEFAULT 'image',
  ADD COLUMN video_url text,
  ADD COLUMN poster_url text;

ALTER TABLE public.gallery_items
  ALTER COLUMN image_url DROP NOT NULL;

ALTER TABLE public.gallery_items
  ADD CONSTRAINT gallery_items_media_type_check
  CHECK (
    (media_type = 'image' AND image_url IS NOT NULL AND video_url IS NULL)
    OR
    (media_type = 'video' AND video_url IS NOT NULL)
  );

ALTER TABLE public.gallery_items
  ADD CONSTRAINT gallery_items_media_type_values_check
  CHECK (media_type IN ('image', 'video'));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-videos',
  'gallery-videos',
  true,
  52428800,
  ARRAY['video/mp4']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "gallery_videos_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-videos');

CREATE POLICY "gallery_videos_auth_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery-videos');

CREATE POLICY "gallery_videos_auth_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery-videos')
  WITH CHECK (bucket_id = 'gallery-videos');

CREATE POLICY "gallery_videos_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery-videos');
