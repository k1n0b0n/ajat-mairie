import { statSync } from 'node:fs';
import { join } from 'node:path';

// CompteRendu.fileSizeKb : calculé au build à partir du PDF de public/ (jamais saisi).
export function tailleKo(chemin: string): number {
  return Math.max(1, Math.round(statSync(join(process.cwd(), 'public', chemin)).size / 1024));
}

export function formaterTaille(ko: number): string {
  return ko >= 1024 ? `${(ko / 1024).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mo` : `${ko} Ko`;
}
