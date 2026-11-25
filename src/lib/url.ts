// Préfixe les chemins internes avec la base du site (vide sur un domaine personnalisé).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (chemin: string): string => `${base}${chemin}`;
