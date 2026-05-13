/**
 * Classifica ufficiale dei lavoratori del Moustache.
 * L'ordine dell'array è l'ordine in classifica (rank 1 = primo).
 */
export const lavoratori = [
	{
		nome: 'Ayamane',
		ruolo: 'Il Trattore',
		emoji: '👨‍🍳',
		colore: '#e8b84b',
		punti: 85,
		tagline: 'Va avanti a prescindere. Clienti, problemi, code alle 22:00 — tutto passa sotto i cingoli. Il Moustache gira perché lui non si ferma mai.'
	},
	{
		nome: 'Lorenzo',
		ruolo: 'Il Signor Bruschetta',
		emoji: '🍷',
		colore: '#c0392b',
		punti: 80,
		tagline: "Porta classe anche dove non è richiesta. L'unico capace di trasformare una bruschetta in un'esperienza esistenziale. Toasted. Refined. Leggendario."
	},
	{
		nome: 'Marco',
		ruolo: 'Solo Qualità',
		emoji: '🔥',
		colore: '#e67e22',
		punti: 49,
		tagline: 'Ha rimandato indietro un piatto tre volte. Era il suo. Non accetta compromessi, non abbassa gli standard. Solo qualità — e lo ripete spesso, nel caso non fosse chiaro.'
	},
	{
		nome: 'Giovanni',
		ruolo: 'La Ruota di Carro',
		emoji: '🍽️',
		colore: '#3498db',
		punti: 49,
		tagline: 'Rotola, gira, a volte sbanda. Ma alla fine arriva sempre a destinazione. La forza di un\'intera carrozza su quattro ruote solide.'
	},
	{
		nome: 'Alessia',
		ruolo: 'La Permalosa',
		emoji: '🌱',
		colore: '#27ae60',
		punti: 47,
		tagline: 'Non è arrabbiata. Va tutto bene. Stava solo guardando nel vuoto. Non gliene importa niente. Giura. Non chiedere più.'
	},
	{
		nome: 'Sgrollo',
		ruolo: 'Il Fuoriclasse',
		emoji: '👻',
		colore: '#9b59b6',
		punti: 45,
		tagline: 'Tecnicamente fuoriclasse. Operativamente in corso d\'opera. Il talento c\'è — lo conferma lui stesso ogni giorno, con grande e sobria modestia.'
	},
	{
		nome: 'Cips',
		ruolo: 'Il Capitano',
		emoji: '🥔',
		colore: '#f39c12',
		punti: 39,
		tagline: 'Prende decisioni. Dà ordini. A volte vengono anche seguiti. Il Capitano non discute, il Capitano comanda — con o senza nave in vista.'
	},
	{
		nome: 'Rita',
		ruolo: 'La Mamma',
		emoji: '💅',
		colore: '#e91e8c',
		punti: 33,
		tagline: 'Ti vuole bene, ti sgrida, ti rimette in riga. Sa già tutto prima che tu apra bocca. Senza di lei il ristorante sarebbe un orfanotrofio.'
	},
	{
		nome: 'Aurora',
		ruolo: 'La Strana',
		emoji: '🌅',
		colore: '#ff6b6b',
		punti: 14,
		tagline: 'Segue una logica tutta sua. Incomprensibile, originale, a volte geniale. L\'universo la capisce — noi ci stiamo ancora lavorando.'
	},
	{
		nome: 'Mattia',
		ruolo: 'Quello Non Simpatico',
		emoji: '😴',
		colore: '#95a5a6',
		punti: 8,
		tagline: 'Non è antipatico, è selettivo. Molto selettivo. La simpatia la conserva per le grandi occasioni. Nel frattempo, lavora. A modo suo, ma lavora.'
	}
];

export const maxPunti = Math.max(...lavoratori.map((l) => l.punti));
