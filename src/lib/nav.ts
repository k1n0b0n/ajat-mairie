export interface LienNav {
  libelle: string;
  href: string;
}

// Navigation principale : une entrée par rubrique, ajoutée au fil des user stories.
export const navPrincipale: LienNav[] = [
  { libelle: 'Accueil', href: '/' },
  { libelle: 'Actualités', href: '/actualites/' },
  { libelle: 'Comptes rendus', href: '/comptes-rendus/' },
  { libelle: 'Découvrir Ajat', href: '/decouvrir/' },
  { libelle: 'Démarches', href: '/demarches/' },
  { libelle: 'Associations', href: '/associations/' },
  { libelle: 'Salle des fêtes', href: '/salle-des-fetes/' },
  { libelle: 'Liens utiles', href: '/liens-utiles/' },
];

// Liens du pied de page : mentions légales, confidentialité, accessibilité, plan du site.
export const liensPied: LienNav[] = [
  { libelle: 'Mentions légales', href: '/mentions-legales/' },
  { libelle: 'Politique de confidentialité', href: '/confidentialite/' },
  { libelle: 'Accessibilité', href: '/accessibilite/' },
  { libelle: 'Plan du site', href: '/plan-du-site/' },
];
