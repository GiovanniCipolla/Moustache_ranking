<script>
	let { lavoratore, onclose } = $props();

	let emojiVisible = $state(false);
	let nameVisible = $state(false);
	let tagVisible = $state(false);
	let counterVal = $state(0);
	let intervalId;

	$effect(() => {
		const t1 = setTimeout(() => (emojiVisible = true), 60);
		const t2 = setTimeout(() => (nameVisible = true), 380);
		const t3 = setTimeout(() => {
			const target = lavoratore.punti;
			let current = 0;
			const steps = 36;
			const inc = target / steps;
			intervalId = setInterval(() => {
				current = Math.min(current + inc, target);
				counterVal = Math.round(current);
				if (current >= target) clearInterval(intervalId);
			}, 700 / steps);
		}, 480);
		const t4 = setTimeout(() => (tagVisible = true), 950);

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
			clearTimeout(t4);
			if (intervalId) clearInterval(intervalId);
		};
	});

	function handleKeydown(e) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop -->
<div
	class="backdrop"
	onclick={onclose}
	role="dialog"
	aria-modal="true"
	aria-label="Profilo di {lavoratore.nome}"
>
	<!-- Modal box — stopPropagation per non chiudere cliccando dentro -->
	<div class="modal" onclick={(e) => e.stopPropagation()}>
		<!-- Barra colore in cima -->
		<div class="accent-bar" style="background: {lavoratore.colore}"></div>

		<!-- Close -->
		<button class="close-btn" onclick={onclose} aria-label="Chiudi">✕</button>

		<!-- Glow blob -->
		<div class="glow" style="background: radial-gradient(circle, {lavoratore.colore} 0%, transparent 70%)"></div>

		<!-- Emoji -->
		<div class="emoji-wrap" class:visible={emojiVisible}>
			<span class="emoji">{lavoratore.emoji}</span>
		</div>

		<!-- Nome -->
		<div class="nome-wrap" class:visible={nameVisible} style="--glow-color: {lavoratore.colore}">
			<div class="nome">{lavoratore.nome}</div>
			<div class="ruolo">{lavoratore.ruolo}</div>
		</div>

		<!-- Punti counter -->
		<div class="punti-wrap" class:visible={nameVisible}>
			<span class="punti-counter" style="color: {lavoratore.colore}">{counterVal}</span>
			<span class="punti-label">punti</span>
		</div>

		<!-- Tagline -->
		<p class="tagline" class:visible={tagVisible}>
			"{lavoratore.tagline}"
		</p>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(4, 3, 2, 0.82);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		animation: backdrop-in 0.2s ease both;
	}

	@keyframes backdrop-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	.modal {
		position: relative;
		background: rgba(255, 245, 230, 0.05);
		border: 1px solid rgba(255, 245, 230, 0.1);
		border-radius: 24px;
		padding: 2.2rem 2rem 2rem;
		width: 100%;
		max-width: 360px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
		overflow: hidden;
		animation: modal-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	@keyframes modal-in {
		from { opacity: 0; transform: scale(0.88) translateY(20px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	/* barra colore top */
	.accent-bar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		border-radius: 24px 24px 0 0;
	}

	/* close */
	.close-btn {
		position: absolute;
		top: 0.9rem;
		right: 0.9rem;
		background: rgba(255, 245, 230, 0.08);
		border: none;
		color: rgba(250, 245, 238, 0.45);
		cursor: pointer;
		font-size: 0.7rem;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s, color 0.15s;
	}
	.close-btn:hover {
		background: rgba(255, 245, 230, 0.14);
		color: #faf5ee;
	}

	/* glow blob */
	.glow {
		position: absolute;
		width: 220px;
		height: 220px;
		border-radius: 50%;
		top: -60px;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.12;
		filter: blur(40px);
		pointer-events: none;
	}

	/* emoji */
	.emoji-wrap {
		opacity: 0;
		transform: scale(0.4);
		transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		z-index: 1;
		margin-top: 0.6rem;
	}
	.emoji-wrap.visible {
		opacity: 1;
		transform: scale(1);
	}

	.emoji {
		font-size: 4.5rem;
		line-height: 1;
		display: block;
		filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.5));
		animation: emoji-bounce 3s ease-in-out infinite 0.8s;
	}

	@keyframes emoji-bounce {
		0%, 100% { transform: translateY(0); }
		50%       { transform: translateY(-6px); }
	}

	/* nome */
	.nome-wrap {
		opacity: 0;
		transform: translateY(14px);
		transition: opacity 0.4s ease, transform 0.4s ease;
		text-align: center;
	}
	.nome-wrap.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.nome {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2.4rem;
		letter-spacing: 0.06em;
		color: #faf5ee;
		text-shadow: 0 0 40px color-mix(in srgb, var(--glow-color) 50%, transparent);
		line-height: 1;
	}

	.ruolo {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgba(250, 245, 238, 0.35);
		margin-top: 0.2rem;
	}

	/* punti counter */
	.punti-wrap {
		display: flex;
		align-items: baseline;
		gap: 0.35rem;
		opacity: 0;
		transition: opacity 0.4s ease 0.1s;
	}
	.punti-wrap.visible { opacity: 1; }

	.punti-counter {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2rem;
		letter-spacing: 0.04em;
		line-height: 1;
	}

	.punti-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(250, 245, 238, 0.3);
	}

	/* tagline */
	.tagline {
		opacity: 0;
		transform: translateY(8px);
		transition: opacity 0.4s ease, transform 0.4s ease;
		font-size: 0.82rem;
		color: rgba(250, 245, 238, 0.5);
		text-align: center;
		font-style: italic;
		line-height: 1.55;
		padding: 0.6rem 0.3rem 0;
		border-top: 1px solid rgba(255, 245, 230, 0.07);
		width: 100%;
		margin-top: 0.3rem;
	}
	.tagline.visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>
