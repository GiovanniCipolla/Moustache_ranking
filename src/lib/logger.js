import { PUBLIC_DISCORD_WEBHOOK } from '$env/static/public';

const WEBHOOK = PUBLIC_DISCORD_WEBHOOK || '';

function ora() {
	return new Date().toLocaleString('it-IT', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

function dispositivo() {
	const ua = navigator.userAgent;
	if (/iPad/i.test(ua)) return '📱 Tablet';
	if (/Android|iPhone|iPod/i.test(ua)) return '📱 Mobile';
	return '🖥️ Desktop';
}

async function send(payload) {
	if (!WEBHOOK) return;
	try {
		await fetch(WEBHOOK, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
	} catch {}
}

/** Logga una visita al sito. Una sola volta per sessione. */
export function logVisita() {
	if (typeof sessionStorage === 'undefined') return;
	if (sessionStorage.getItem('moustache_visit_logged')) return;
	sessionStorage.setItem('moustache_visit_logged', '1');

	send({
		embeds: [
			{
				title: '🥸 Nuova visita · Moustache Wall of Fame',
				color: 0xc8832a,
				fields: [
					{ name: '📅 Quando', value: ora(), inline: true },
					{ name: '💻 Dispositivo', value: dispositivo(), inline: true }
				]
			}
		]
	});
}
