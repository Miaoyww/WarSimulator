<script lang="ts">
	import SettingCard from '$lib/components/settings/settings-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';

	import { version } from '$app/environment';
	import favicon from '$lib/assets/favicon.png';
</script>

<div>
	<div class="mt-6 pb-10 text-center lg:max-w-4xl ">
		<div class="mb-4 flex justify-center gap-6 text-gray-600">
			<img src="{favicon}" alt="App Logo" class="h-64 w-64 rounded-md shadow-md" />
		</div>
	</div>

	<div class="space-y-3 pb-10 lg:max-w-4xl ">
		<div class="font-weight-bold text-xl font-bold">关于</div>
		<SettingCard let:id title="版本号">
			<Label {id}>v{version}</Label>
		</SettingCard>

		<SettingCard let:id title="开源许可">
			<Button
				{id}
				class="w-24"
				variant="outline"
				href="https://github.com/Miaoyww/WarSimulator/blob/master/LICENSE"
			>
				MIT
			</Button>
		</SettingCard>

		<SettingCard let:id title="Github 仓库">
			<Button
				{id}
				class="w-24"
				variant="outline"
				href="https://github.com/Miaoyww/WarSimulator"
			>
				Github
			</Button>
		</SettingCard>

		<SettingCard let:id title="检查更新">
			<Button {id} class="w-24" variant="outline">立即检查</Button>
		</SettingCard>
		<div class="font-weight-bold text-xl font-bold">重置设置</div>
		<SettingCard let:id title="重置所有设置">
			<Button {id} class="w-24" variant="destructive">立即重置</Button>
		</SettingCard>
	</div>
</div>
