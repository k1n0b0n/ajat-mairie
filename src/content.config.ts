// Collections du site, ajoutées story par story (voir specs/001-site-mairie-ajat/tasks.md).
// Schéma commun des contenus Markdown : src/lib/schema-commun.ts.
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const heure = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Format attendu : HH:MM');
const plage = z.object({ open: heure, close: heure });

const enMinutes = (h: string): number => Number(h.slice(0, 2)) * 60 + Number(h.slice(3));

// Mairie.hours : un jour = 0..n plages, close > open, sans chevauchement (contracts/content-schemas.md C9)
const jour = z
  .array(plage)
  .default([])
  .superRefine((plages, ctx) => {
    const triees = [...plages].sort((a, b) => enMinutes(a.open) - enMinutes(b.open));
    triees.forEach((p, i) => {
      if (enMinutes(p.close) <= enMinutes(p.open)) {
        ctx.addIssue({ code: 'custom', message: `Plage ${p.open}-${p.close} : la fermeture doit suivre l'ouverture.` });
      }
      const suivante = triees[i + 1];
      if (suivante && enMinutes(suivante.open) < enMinutes(p.close)) {
        ctx.addIssue({ code: 'custom', message: `Les plages ${p.open}-${p.close} et ${suivante.open}-${suivante.close} se chevauchent.` });
      }
    });
  });

// data-model.md : Mairie (source unique des horaires, FR-017)
const mairie = defineCollection({
  loader: file('src/content/donnees/mairie.yml'),
  schema: z.object({
    name: z.string().min(3),
    address: z.object({
      street: z.string().min(1),
      postalCode: z.string().regex(/^\d{5}$/),
      city: z.string().min(1),
    }),
    phone: z.string().regex(/^0\d( ?\d{2}){4}$/, 'Numéro français attendu, ex. 05 53 00 00 00'),
    email: z.email(),
    hours: z.object({
      lundi: jour,
      mardi: jour,
      mercredi: jour,
      jeudi: jour,
      vendredi: jour,
      samedi: jour,
      dimanche: jour,
    }),
    closures: z
      .array(
        z
          .object({ from: z.coerce.date(), to: z.coerce.date(), reason: z.string().min(3) })
          .refine((c) => c.to >= c.from, { message: 'La date de fin précède la date de début.' }),
      )
      .default([]),
    hoursNote: z.string().optional(),
  }),
});

export const collections = { mairie };
