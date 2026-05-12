<script>
	import { onMount } from 'svelte';
	import { lavoratori, maxPunti } from '$lib/lavoratori.js';
	import CardLavoratore from '$lib/components/CardLavoratore.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { logVisita } from '$lib/logger.js';

	onMount(() => {
		logVisita();
	});

	let selected = $state(null);

	const podio = lavoratori.slice(0, 3);
	const resto = lavoratori.slice(3);

	// Rileva i pari merito (stessi punti)
	const pariMerito = lavoratori
		.map((l) => l.punti)
		.filter((p, i, arr) => arr.indexOf(p) !== i);

	function openModal(l) {
		selected = l;
	}

	function closeModal() {
		selected = null;
	}
</script>

<!-- bg blobs decorativi — toni caldi ristorante -->
<div class="bg-blobs" aria-hidden="true">
	<div class="blob blob-1"></div>
	<div class="blob blob-2"></div>
	<div class="blob blob-3"></div>
</div>

<main>
	<!-- ── HEADER ── -->
	<header>
		<p class="pre-title">Wall of Fame</p>
		<h1>
			<span class="title-icon">🥸</span>
			<span class="title-text">Moustache</span>
		</h1>
		<p class="subtitle">
			{lavoratori.length} lavoratori in gara · Tocca una card per scoprire il profilo segreto
		</p>
	</header>

	<!-- ── PODIO ── -->
	<section class="section podio-section">
		<div class="section-header">
			<span class="section-label">Il Podio</span>
			<div class="section-line"></div>
		</div>
		<div class="podio-grid">
			<div class="podio-slot podio-second">
				<CardLavoratore lavoratore={podio[1]} rank={2} {maxPunti} onselect={openModal} />
			</div>
			<div class="podio-slot podio-first">
				<div class="crown-wrap" aria-hidden="true">👑</div>
				<CardLavoratore lavoratore={podio[0]} rank={1} {maxPunti} onselect={openModal} />
			</div>
			<div class="podio-slot podio-third">
				<CardLavoratore lavoratore={podio[2]} rank={3} {maxPunti} onselect={openModal} />
			</div>
		</div>
	</section>

	<!-- SEPARATORE -->
	<div class="sep" aria-hidden="true">
		<div class="sep-line"></div>
		<span class="sep-text">Classifica completa</span>
		<div class="sep-line"></div>
	</div>

	<!-- ── GRID RESTO ── -->
	<section class="section grid-section">
		<div class="cards-grid">
			{#each resto as lavoratore, i}
				{@const rank = i + 4}
				{@const isPari = pariMerito.includes(lavoratore.punti)}
				<div class="card-slot" class:pari={isPari}>
					{#if isPari}
						<span class="pari-label">pari merito</span>
					{/if}
					<CardLavoratore {lavoratore} {rank} {maxPunti} onselect={openModal} />
				</div>
			{/each}
		</div>
	</section>

	<!-- FOOTER -->
	<footer>
		<p>🥸 Classifica ufficiale e inappellabile · Il Moustache non si assume responsabilità per crisi esistenziali</p>
	</footer>
</main>

<!-- MODAL -->
{#if selected}
	<Modal lavoratore={selected} onclose={closeModal} />
{/if}

<style>
	/* ── BG BLOBS ── toni caldi -->
	.bg-blobs {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
	}

	.blob-1 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, #8b1a1a 0%, transparent 70%);
		top: -120px;
		left: -80px;
		opacity: 0.18;
		animation: drift 22s ease-in-out infinite;
	}

	.blob-2 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, #c8732a 0%, transparent 70%);
		bottom: -80px;
		right: -60px;
		opacity: 0.14;
		animation: drift 26s ease-in-out infinite reverse;
	}

	.blob-3 {
		width: 260px;
		height: 260px;
		background: radial-gradient(circle, #d4a020 0%, transparent 70%);
		top: 42%;
		left: 58%;
		opacity: 0.1;
		animation: drift 30s ease-in-out infinite 8s;
	}

	@keyframes drift {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33%       { transform: translate(45px, -35px) scale(1.07); }
		66%       { transform: translate(-28px, 45px) scale(0.93); }
	}

	/* ── LAYOUT ── */
	main {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem 5rem;
	}

	/* ── HEADER ── */
	header {
		text-align: center;
		padding: 3.5rem 1rem 2.5rem;
		animation: fade-down 0.65s ease both;
	}

	@keyframes fade-down {
		from { opacity: 0; transform: translateY(-18px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.pre-title {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.26em;
		color: rgba(250, 245, 238, 0.3);
		margin-bottom: 0.6rem;
		font-weight: 600;
	}

	h1 {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
	}

	.title-icon {
		font-size: clamp(2.8rem, 6vw, 5.5rem);
		animation: mustache-rock 5s ease-in-out infinite;
		display: inline-block;
	}

	@keyframes mustache-rock {
		0%, 100% { transform: rotate(-3deg) scale(1); }
		50%       { transform: rotate(4deg) scale(1.05); }
	}

	.title-text {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(3rem, 8vw, 7rem);
		letter-spacing: 0.06em;
		color: #fff;
		text-shadow: 0 0 80px rgba(200, 131, 42, 0.25);
	}

	.subtitle {
		margin-top: 0.9rem;
		font-size: 0.82rem;
		color: rgba(250, 245, 238, 0.32);
	}

	/* ── SECTIONS ── */
	.section {
		margin-bottom: 1.5rem;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.4rem;
	}

	.section-label {
		font-size: 0.66rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: rgba(250, 245, 238, 0.28);
		font-weight: 700;
		white-space: nowrap;
	}

	.section-line {
		flex: 1;
		height: 1px;
		background: rgba(255, 245, 230, 0.07);
	}

	/* ── PODIO ── */
	.podio-grid {
		display: grid;
		grid-template-columns: 1fr 1.12fr 1fr;
		gap: 0.9rem;
		max-width: 560px;
		margin: 0 auto;
		align-items: end;
	}

	.podio-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.podio-first  { margin-bottom: -10px; }
	.podio-second { padding-top: 24px; }
	.podio-third  { padding-top: 40px; }

	.crown-wrap {
		font-size: 1.5rem;
		margin-bottom: -4px;
		animation: crown-float 2.6s ease-in-out infinite;
		display: block;
		text-align: center;
	}

	@keyframes crown-float {
		0%, 100% { transform: translateY(0) rotate(-5deg); }
		50%       { transform: translateY(-5px) rotate(5deg); }
	}

	/* ── SEPARATORE ── */
	.sep {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 2rem 0 1.8rem;
	}

	.sep-line {
		flex: 1;
		height: 1px;
		background: rgba(255, 245, 230, 0.07);
	}

	.sep-text {
		font-size: 0.63rem;
		text-transform: uppercase;
		letter-spacing: 0.22em;
		color: rgba(250, 245, 238, 0.22);
		font-weight: 700;
		white-space: nowrap;
	}

	/* ── GRID RESTO ── */
	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.9rem;
	}

	/* ── PARI MERITO ── */
	.card-slot {
		position: relative;
	}

	.pari-label {
		position: absolute;
		top: -0.7rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.55rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(250, 245, 238, 0.3);
		white-space: nowrap;
		background: rgba(255, 245, 230, 0.06);
		padding: 0.1rem 0.5rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 245, 230, 0.1);
		z-index: 1;
	}

	/* ── FOOTER ── */
	footer {
		text-align: center;
		color: rgba(250, 245, 238, 0.18);
		font-size: 0.72rem;
		padding-top: 2.5rem;
	}

	/* ── RESPONSIVE ── */
	@media (max-width: 600px) {
		main { padding: 0 0.9rem 3rem; }

		.podio-grid { gap: 0.6rem; }

		.cards-grid {
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
			gap: 0.65rem;
		}

		h1 { flex-direction: column; gap: 0.2rem; }
	}
</style>
