import { z } from 'astro/zod';

// Champs communs à toutes les collections Markdown (data-model.md, « Champs communs »).
export const schemaCommun = z.object({
  title: z.string().min(3).max(120),
  draft: z.boolean().default(true),
  publishDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
});

export type ChampsCommuns = z.infer<typeof schemaCommun>;
