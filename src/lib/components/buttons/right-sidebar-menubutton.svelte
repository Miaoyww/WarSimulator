<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

    let { content } = $props<{ content: string }>();
	
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<slot />
		</Tooltip.Trigger>
		<Tooltip.Content>
			{content}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
