<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
	import * as L from 'leaflet';
	import { coords, zoom } from '$lib/stores/map-store';
	import { ContextMenu, Portal } from 'bits-ui';
	import { CirclePlus } from '@lucide/svelte';
	import * as Kbd from '$lib/components/ui/kbd/index.js';

	let map: L.Map;
	let myOpen = $state(false);

	let menuX = $state(0);
	let menuY = $state(0);

	let virtualAnchor: any = null;
	function getOpen() {
		return myOpen;
	}

	function setOpen(newOpen: boolean) {
		myOpen = newOpen;
	}
	onMount(async () => {
		const readyMap = await waitForMapReady();

		readyMap.on('mousemove', (e) => {
			coords.set(e.latlng);
		});
		readyMap.on('zoomend', () => {
			zoom.set(readyMap.getZoom());
		});

		readyMap.on('contextmenu', async (e) => {
			virtualAnchor = {
				getBoundingClientRect: () => ({
					width: 0,
					height: 0,
					top: e.originalEvent.clientY,
					bottom: e.originalEvent.clientY,
					left: e.originalEvent.clientX,
					right: e.originalEvent.clientX
				}),
				contextElement: document.body // optional, floating-ui 使用的参考容器
			};

			const rect = (map.getContainer() as HTMLDivElement).getBoundingClientRect();
			menuX = e.originalEvent.clientX - rect.left;
			menuY = e.originalEvent.clientY - rect.top;

			setOpen(true);
		});
	});

	async function waitForMapReady() {
		while (!map) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
		return map;
	}
</script>

<ContextMenu.Root bind:open={getOpen, setOpen}>
	<ContextMenu.Portal>
		<ContextMenu.Content
			class="absolute z-[9999] w-[220px] rounded-xl border border-muted bg-background px-1 py-1.5 shadow-popover outline-none"
			customAnchor={virtualAnchor}
		>
			<ContextMenu.Sub>
				<ContextMenu.SubTrigger
					class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium select-none focus-visible:outline-none data-highlighted:bg-muted data-[state=open]:bg-muted"
				>
					<div class="flex items-center">
						<CirclePlus class="text-foreground-alt mr-2 size-5" />
						添加
					</div>
					<div class="ml-auto flex items-center gap-px">
						<Kbd.Group>
							<Kbd.Root>Ctrl</Kbd.Root>
							<span>+</span>
							<Kbd.Root>B</Kbd.Root>
						</Kbd.Group>
					</div>
				</ContextMenu.SubTrigger>
				<ContextMenu.SubContent
					class="z-100 w-[209px] rounded-xl border border-muted bg-background px-1 py-1.5 ring-0! shadow-popover ring-transparent!"
					sideOffset={10}
				>
					<ContextMenu.Item
						class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-normal select-none focus-visible:outline-none data-highlighted:bg-muted"
					>
						Header
					</ContextMenu.Item>
					<ContextMenu.Item
						class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-normal select-none focus-visible:outline-none data-highlighted:bg-muted"
					>
						Paragraph
					</ContextMenu.Item>
					<ContextMenu.Item
						class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-normal select-none focus-visible:outline-none data-highlighted:bg-muted"
					>
						Codeblock
					</ContextMenu.Item>
					<ContextMenu.Item
						class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-normal select-none focus-visible:outline-none data-highlighted:bg-muted"
					>
						List
					</ContextMenu.Item>
					<ContextMenu.Item
						class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-normal select-none focus-visible:outline-none data-highlighted:bg-muted"
					>
						Task
					</ContextMenu.Item>
				</ContextMenu.SubContent>
			</ContextMenu.Sub>
		</ContextMenu.Content>
	</ContextMenu.Portal>
</ContextMenu.Root>

<div class="relative h-full w-full">
	<Map
		bind:instance={map}
		options={{
			center: [51.505, -0.09],
			zoom: $zoom,
			zoomControl: false
		}}
	>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
	</Map>
</div>
