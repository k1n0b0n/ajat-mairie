export interface LienNav {
  libelle: string;
  href: string;
}

// Navigation principale : une entrée par rubrique, ajoutée au fil des user stories.
export const navPrincipale: LienNav[] = [{ libelle: 'Accueil', href: '/' }];

// Liens du pied de page : mentions légales, confidentialité, accessibilité, plan du site (phase 9).
export const liensPied: LienNav[] = [];
