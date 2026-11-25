import { expect, test } from '@playwright/test';
import { phraseHoraires } from '../src/lib/horaires-phrase';

// Tests unitaires de la phrase d'horaires (contracts/phrase-horaires.md), sans navigateur.
const plage = (open: string, close: string) => ({ open, close });
const vide = { lundi: [], mardi: [], mercredi: [], jeudi: [], vendredi: [], samedi: [], dimanche: [] };
const maintenant = new Date('2026-11-26T10:00:00Z');

test('mardi, jeudi et vendredi regroupés', () => {
  const h = { ...vide, mardi: [plage('14:00', '17:00')], jeudi: [plage('14:00', '17:00')], vendredi: [plage('14:00', '17:00')] };
  expect(phraseHoraires(h, [], undefined, maintenant)).toBe('Ouverte le mardi, le jeudi et le vendredi, de 14 h à 17 h.');
});

test('deux groupes de plages différentes', () => {
  const h = { ...vide, lundi: [plage('09:00', '12:00')], mardi: [plage('09:00', '12:00'), plage('14:00', '17:00')], jeudi: [plage('09:00', '12:00'), plage('14:00', '17:00')] };
  expect(phraseHoraires(h, [], undefined, maintenant)).toBe('Ouverte le lundi, de 9 h à 12 h ; le mardi et le jeudi, de 9 h à 12 h et de 14 h à 17 h.');
});

test('les sept jours', () => {
  const p = [plage('09:00', '12:00')];
  const h = { lundi: p, mardi: p, mercredi: p, jeudi: p, vendredi: p, samedi: p, dimanche: p };
  expect(phraseHoraires(h, [], undefined, maintenant)).toBe('Ouverte tous les jours, de 9 h à 12 h.');
});

test('heures avec minutes', () => {
  const h = { ...vide, lundi: [plage('08:30', '12:00')] };
  expect(phraseHoraires(h, [], undefined, maintenant)).toBe('Ouverte le lundi, de 8 h 30 à 12 h.');
});

test('aucun jour ouvert', () => {
  expect(phraseHoraires(vide, [], undefined, maintenant)).toBe('Fermée tous les jours. Appelez pour prendre rendez-vous.');
});

test('fermeture à venir, puis fermeture passée ignorée', () => {
  const h = { ...vide, mardi: [plage('14:00', '17:00')] };
  const avenir = [{ from: new Date('2026-12-24T00:00:00Z'), to: new Date('2026-12-31T00:00:00Z'), reason: 'congés' }];
  const passee = [{ from: new Date('2026-01-02T00:00:00Z'), to: new Date('2026-01-09T00:00:00Z'), reason: 'travaux' }];
  expect(phraseHoraires(h, avenir, undefined, maintenant)).toBe('Ouverte le mardi, de 14 h à 17 h. Fermée du 24 au 31 décembre 2026 (congés).');
  expect(phraseHoraires(h, passee, undefined, maintenant)).toBe('Ouverte le mardi, de 14 h à 17 h.');
});

test('remarque ajoutée et fermeture sur un seul jour', () => {
  const h = { ...vide, mardi: [plage('14:00', '17:00')] };
  const un = [{ from: new Date('2026-12-24T00:00:00Z'), to: new Date('2026-12-24T00:00:00Z'), reason: 'pont' }];
  expect(phraseHoraires(h, un, 'Le maire reçoit sur rendez-vous.', maintenant)).toBe(
    'Ouverte le mardi, de 14 h à 17 h. Fermée le 24 décembre 2026 (pont). Le maire reçoit sur rendez-vous.',
  );
});
