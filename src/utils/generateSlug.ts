import slugify from 'slugify';

export const generateSlug = (slug: string) =>
  slugify(slug, {
    lower: true,
  });
