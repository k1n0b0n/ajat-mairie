// Collections du site, ajoutées story par story (voir specs/001-site-mairie-ajat/tasks.md).
// Schéma commun des contenus Markdown : src/lib/schema-commun.ts.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { schemaCommun } from './lib/schema-commun';

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

// data-model.md : Actualité (summary ≤ 200 car. ; cover.alt obligatoire dès qu'une image est fournie, C3)
const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/actualites' }),
  schema: schemaCommun.extend({
    summary: z.string().min(1).max(200),
    cover: z.object({ image: z.string().min(1), alt: z.string().min(1) }).optional(),
  }),
});

// data-model.md : Compte rendu (meetingDate, file ; fileSizeKb est calculé au build, jamais saisi)
const comptesRendus = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/comptes-rendus' }),
  schema: schemaCommun.extend({
    meetingDate: z.coerce.date(),
    file: z.string().regex(/^\/documents\/comptes-rendus\/[^/]+\.pdf$/i, 'Chemin attendu : /documents/comptes-rendus/nom-du-fichier.pdf'),
  }),
});

const urlHttps = z.url().refine((u) => u.startsWith('https://'), { message: "L'adresse doit commencer par https://" });

// Crédit d'une photo : la licence exige l'auteur et le lien vers la licence (data-model.md, Visuel.credit)
const creditPhoto = z
  .object({
    author: z.string().min(1).optional(),
    license: z.string().min(1).optional(),
    licenseUrl: urlHttps.optional(),
    sourceUrl: urlHttps.optional(),
    modified: z.boolean().default(true),
  })
  .refine((c) => !c.license || (c.author && c.licenseUrl), {
    message: "Une licence exige l'auteur et le lien vers la licence.",
  });

// Photo d'illustration d'une page : image de src/assets/images/, description et crédit
const illustration = z.object({
  image: z.string().min(1),
  alt: z.string().min(10).max(160),
  credit: creditPhoto.optional(),
});

// data-model.md : Page (kind ; une page légale ou la déclaration d'accessibilité ne peut pas rester en brouillon, C7)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/pages' }),
  schema: schemaCommun
    .extend({
      slug: z.string().regex(/^[a-z0-9-]+(\/[a-z0-9-]+)*$/).optional(),
      kind: z.enum(['decouverte', 'legal', 'confidentialite', 'accessibilite', 'libre']).default('libre'),
      description: z.string().max(200).optional(),
      order: z.number().int().optional(),
      cover: illustration.optional(),
    })
    .refine((p) => !(['legal', 'accessibilite'].includes(p.kind) && p.draft), {
      message: "Une page légale ou la déclaration d'accessibilité ne peut pas rester en brouillon.",
    }),
});

// data-model.md : Visuel d'accueil (image, alt, crédit). La licence exige l'auteur et le lien de licence.
const visuels = defineCollection({
  loader: file('src/content/donnees/visuels.yml'),
  schema: illustration,
});

// data-model.md : Texte de l'accueil (Texte de l'accueil.village : 60 à 320 caractères)
const accueil = defineCollection({
  loader: file('src/content/donnees/accueil.yml'),
  schema: z.object({ village: z.string().min(60).max(320) }),
});

// data-model.md : Démarche (officialUrl en https, C2)
const demarches = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/demarches' }),
  schema: schemaCommun.extend({
    summary: z.string().min(1).max(200),
    documents: z.array(z.string().min(1)).default([]),
    officialUrl: urlHttps,
    order: z.number().int().optional(),
  }),
});

// data-model.md : Association (≥ 1 contact, accord de publication obligatoire, C8)
const associations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/associations' }),
  schema: schemaCommun.extend({
    activity: z.string().min(1),
    contacts: z
      .array(z.object({ type: z.enum(['tel', 'email', 'adresse', 'site']), value: z.string().min(1) }))
      .min(1, 'Au moins un contact est nécessaire.'),
    consent: z.boolean().refine((v) => v === true, { message: "L'accord de l'association pour publier ses coordonnées est obligatoire." }),
  }),
});

// data-model.md : Salle des fêtes. Champs facultatifs tant que la mairie ne les a pas fournis.
const salleDesFetes = defineCollection({
  loader: file('src/content/donnees/salle-des-fetes.yml'),
  schema: z.object({
    capacity: z.number().int().positive().optional(),
    description: z.string().optional(),
    conditions: z.string().optional(),
    rates: z.array(z.object({ label: z.string().min(1), amount_eur: z.number().nonnegative(), unit: z.string().min(1) })).default([]),
    contact: z.string().optional(),
  }),
});

// data-model.md : Liens utiles
const liens = defineCollection({
  loader: file('src/content/donnees/liens.yml'),
  schema: z.object({
    items: z.array(z.object({ label: z.string().min(1), url: urlHttps, theme: z.string().min(1) })),
  }),
});

export const collections = {
  mairie,
  actualites,
  'comptes-rendus': comptesRendus,
  demarches,
  associations,
  'salle-des-fetes': salleDesFetes,
  liens,
  pages,
  visuels,
  accueil,
};
