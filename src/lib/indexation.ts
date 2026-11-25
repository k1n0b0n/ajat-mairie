// Indexation par les moteurs de recherche : désactivée par défaut (domaine provisoire).
// Pour l'autoriser : variable de dépôt INDEXATION=on (docs/administration.md §10), puis redéploiement.
export const indexable = process.env.INDEXATION === 'on' && process.env.PREVIEW !== '1';
