<script>
	let { lavoratore, rank, maxPunti, onselect } = $props();

	let card = $state(null);
	let tiltX = $state(0);
	let tiltY = $state(0);
	let shineX = $state(50);
	let shineY = $state(50);
	let hovered = $state(false);

	const rankColor = $derived(
		rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : lavoratore.colore
	);
	const isTop3 = $derived(rank <= 3);
	const rankLabel = $derived(
		rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`
	);
	const barWidth = $derived(`${(lavoratore.punti / maxPunti) * 100}%`);

	function onmousemove(e) {
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
		tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
		shineX = (x / rect.width) * 100;
		shineY = (y / rect.height) * 100;
	}

	function onmouseleave() {
		tiltX = 0;
		tiltY = 0;
		shineX = 50;
		shineY = 50;
		hovered = false;
	}

	function onmouseenter() {
		hovered = true;
	}
</script>

<div
	class="card-wrapper"
	style="--i: {rank - 1}"
	bind:this={card}
	{onmousemove}
	{onmouseleave}
	{onmouseenter}
	role="button"
	tabindex="0"
	onclick={() => onselect(lavoratore)}
	onkeydown={(e) => e.key === 'Enter' && onselect(lavoratore)}
	aria-label="Apri profilo di {lavoratore.nome}"
>
	<div
		class="card"
		class:top3={isTop3}
		style="
			--accent: {rankColor};
			--bar-color: {lavoratore.colore};
			--tilt-x: {tiltX}deg;
			--tilt-y: {tiltY}deg;
			--shine-x: {shineX}%;
			--shine-y: {shineY}%;
		"
	>
		<!-- shine -->
		<div class="shine" class:visible={hovered}></div>

		<!-- rank -->
		<div class="rank-badge" class:is-medal={isTop3}>{rankLabel}</div>

		<!-- emoji -->
		<div class="emoji-wrap">
			<span class="emoji" style="--float-delay: {(rank * 137) % 3000}ms">{lavoratore.emoji}</span>
		</div>

		<!-- nome -->
		<div class="nome">{lavoratore.nome}</div>

		<!-- ruolo -->
		<div class="ruolo">{lavoratore.ruolo}</div>

		<!-- barra punti -->
		<div class="bar-wrap">
			<div class="bar">
				<div class="bar-fill" style="width: {barWidth}"></div>
			</div>
			<span class="punti">{lavoratore.punti}pt</span>
		</div>

		<!-- hint -->
		<div class="hint">Tocca per il profilo</div>
	</div>
</div>

<style>
	.card-wrapper {
		perspective: 1000px;
		cursor: pointer;
		animation: card-enter 0.45s ease both;
		animation-delay: calc(var(--i) * 55ms);
	}

	@keyframes card-enter {
		from { opacity: 0; transform: translateY(24px) scale(0.97); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	.card {
		position: relative;
		background: rgba(255, 245, 230, 0.04);
		border: 1px solid rgba(255, 245, 230, 0.07);
		border-top: 2px solid var(--accent);
		border-radius: 20px;
		padding: 1.1rem 0.8rem 0.8rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		overflow: hidden;
		transition:
			transform 0.15s ease,
			box-shadow 0.2s ease,
			background 0.2s ease;
		transform-style: preserve-3d;
		transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
		will-change: transform;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
	}

	.card-wrapper:hover .card {
		background: rgba(255, 245, 230, 0.07);
		border-color: rgba(255, 245, 230, 0.12);
		border-top-color: var(--accent);
		box-shadow:
			0 14px 42px rgba(0, 0, 0, 0.55),
			0 0 28px color-mix(in srgb, var(--accent) 25%, transparent);
		transform: translateY(-7px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
	}

	.card.top3 {
		border-top-width: 3px;
	}

	/* shine */
	.shine {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at var(--shine-x) var(--shine-y),
			rgba(255, 245, 230, 0.08) 0%,
			transparent 55%
		);
		border-radius: inherit;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.2s;
	}
	.shine.visible { opacity: 1; }

	/* rank */
	.rank-badge {
		position: absolute;
		top: 0.55rem;
		left: 0.65rem;
		font-family: 'Bebas Neue', sans-serif;
		font-size: 0.8rem;
		color: var(--accent);
		letter-spacing: 0.05em;
		opacity: 0.85;
	}
	.rank-badge.is-medal { font-size: 1rem; }

	/* emoji */
	.emoji-wrap { margin: 0.5rem 0 0.05rem; }

	.emoji {
		font-size: 3rem;
		line-height: 1;
		display: block;
		filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
		animation: emoji-float 3.8s ease-in-out infinite;
		animation-delay: var(--float-delay);
		transition: transform 0.2s ease;
	}

	@keyframes emoji-float {
		0%, 100% { transform: translateY(0); }
		50%       { transform: translateY(-5px); }
	}

	.card-wrapper:hover .emoji {
		animation-play-state: paused;
		transform: scale(1.12) translateY(-3px);
	}

	.top3 .emoji { font-size: 3.6rem; }

	/* nome */
	.nome {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.05rem;
		letter-spacing: 0.06em;
		color: #faf5ee;
		text-align: center;
	}
	.top3 .nome { font-size: 1.2rem; }

	/* ruolo */
	.ruolo {
		font-size: 0.6rem;
		color: rgba(250, 245, 238, 0.38);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-align: center;
	}

	/* barra punti */
	.bar-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.3rem;
		padding: 0 0.15rem;
	}

	.bar {
		flex: 1;
		height: 3px;
		background: rgba(255, 245, 230, 0.1);
		border-radius: 999px;
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		background: var(--bar-color);
		border-radius: 999px;
		transition: width 0.8s ease;
		animation: bar-grow 1s ease calc(var(--i) * 55ms + 0.3s) both;
	}

	@keyframes bar-grow {
		from { width: 0% !important; }
	}

	.punti {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 0.72rem;
		color: var(--bar-color);
		letter-spacing: 0.04em;
		white-space: nowrap;
		opacity: 0.9;
	}

	/* hint */
	.hint {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(250, 245, 238, 0.2);
		transition: color 0.2s;
		margin-top: 0.1rem;
	}

	.card-wrapper:hover .hint {
		color: color-mix(in srgb, var(--accent) 55%, rgba(250, 245, 238, 0.35));
	}
</style>
