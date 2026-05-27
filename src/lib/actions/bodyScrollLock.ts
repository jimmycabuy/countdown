function preventScroll(event: Event) {
	event.preventDefault();
}

export default function bodyScrollLock(node: HTMLElement) {
	const docEl = typeof document !== 'undefined' ? document.documentElement : null;

	if (!docEl) return;

	const previousOverflow = docEl.style.overflow;

	docEl.style.overflow = 'hidden';
	node.addEventListener('wheel', preventScroll, { passive: false });
	node.addEventListener('touchmove', preventScroll, { passive: false });

	return {
		destroy() {
			docEl.style.overflow = previousOverflow || '';
			node.removeEventListener('wheel', preventScroll);
			node.removeEventListener('touchmove', preventScroll);
		}
	};
}
