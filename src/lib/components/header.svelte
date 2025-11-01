<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Plus, Settings, SquareArrowOutUpRight, RefreshCcw, PanelLeft, PanelsTopLeft } from '@lucide/svelte';
	import SidebarTrigger from '$lib/components/ui/sidebar/sidebar-trigger.svelte';
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import MapTypeButton from '$lib/components/buttons/map-type-button.svelte';
	import { zoom } from '$lib/stores/map-store';
	import { leftBarPinned } from '$lib/stores/sidebar-store';
	let isBillNow: boolean = $state(false);
	let isSharing = $state(false);

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	>;
	let { class: className, ...restProps }: Props = $props();

	function togglePin() {
		leftBarPinned.update((prev) => !prev);
	}
</script>

<div class={cn('absolute top-5 right-5 left-5 z-1000 flex justify-between', className)}>
	<!--左-->
	<div class="blur-backdrop flex items-center gap-3 rounded-lg p-3">
		<Button variant="ghost" size="icon" class="-ml-1 text-black" onclick={togglePin}>
			<PanelsTopLeft />
		</Button>
		<div class="flex gap-2">
			<MapTypeButton>标准</MapTypeButton>
			<MapTypeButton>地形</MapTypeButton>
			<MapTypeButton>卫星</MapTypeButton>
		</div>
	</div>
	<!--右-->
	<div class="blur-backdrop flex gap-4 rounded-lg px-3 py-3 pl-3 text-sm text-stone-900">
		<div class="flex flex-col gap-1">
			<div class="status-label">缩放级别</div>
			<div class="status-value" id="zoom-level">{$zoom}</div>
		</div>
		<div class="flex flex-col gap-1">
			<div class="status-label">单位数量</div>
			<div class="status-value" id="unit-count">0</div>
		</div>
		<div class="flex flex-col gap-1">
			<div class="status-label">选中单位</div>
			<div class="status-value" id="selected-unit">无</div>
		</div>
		<div class="flex flex-col gap-1">
			<div class="status-label">当前阵营</div>
			<div class="status-value" id="current-faction">未选择</div>
		</div>
	</div>
</div>
