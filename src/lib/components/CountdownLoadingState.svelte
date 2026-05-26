<div class="grid gap-5 lg:grid-cols-[24rem_1fr] lg:gap-6" aria-hidden="true">
	<aside class="glass-panel h-fit rounded-4xl p-4 md:p-5 lg:sticky lg:top-6">
		<div class="mb-5 flex items-center justify-between px-2">
			<div class="h-[0.65rem] w-20 rounded-full bg-white/10"></div>
			<div class="h-8 w-8 rounded-full border border-white/10 bg-white/3"></div>
		</div>

		<div class="space-y-3">
			{#each [0, 1, 2] as item}
				<div
					class="group flex w-full animate-pulse items-center justify-between gap-5 rounded-3xl border border-white/7.5 bg-white/[0.035] px-5 py-5 text-left backdrop-blur-2xl"
					style={`animation-delay:${item * 55}ms`}
				>
					<div class="min-w-0 flex-1">
						<div class="h-4 w-[68%] rounded-full bg-white/10"></div>
						<div class="mt-3 h-[0.68rem] w-[42%] rounded-full bg-white/8"></div>
					</div>

					<div class="shrink-0 text-right">
						<div class="ml-auto h-8 w-10 rounded-full bg-white/10"></div>
						<div class="mt-2 ml-auto h-[0.65rem] w-8 rounded-full bg-white/8"></div>
					</div>
				</div>
			{/each}
		</div>
	</aside>

	<section
		class="glass-panel relative min-h-136 overflow-hidden rounded-[2.25rem] px-6 py-6 md:min-h-176 md:rounded-[3rem] md:px-10 md:py-8"
	>
		<div
			class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,184,255,0.11),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(126,232,200,0.08),transparent_42%)]"
		></div>

		<div class="relative z-10 flex items-center justify-between">
			<div class="h-[0.65rem] w-14 rounded-full bg-white/10"></div>
			<div class="flex items-center gap-2">
				<div class="h-10 w-24 rounded-full border border-white/10 bg-white/3"></div>
				<div class="h-10 w-28 rounded-full border border-white/10 bg-white/3"></div>
			</div>
		</div>

		<div class="relative z-10 grid min-h-112 place-items-center py-14 md:min-h-152">
			<div class="text-center">
				<div class="mx-auto h-5 w-36 animate-pulse rounded-full bg-white/8"></div>
				<div
					class="mx-auto mt-6 h-24 w-24 rounded-full border border-white/10 bg-white/3 md:h-28 md:w-28"
				></div>
				<div
					class="mx-auto mt-6 h-16 w-40 animate-pulse rounded-full bg-white/10 md:h-20 md:w-52"
				></div>
				<div class="mx-auto mt-4 h-3 w-28 animate-pulse rounded-full bg-white/8"></div>
			</div>
		</div>
	</section>
</div>
