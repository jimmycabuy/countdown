<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />
</svelte:head>
{@render children()}
