<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	export let reloadUser: () => void;

	const { avatars } = $page.data;
	let selectedAvatar: number;

	let submitLoading = false;
	let avatarUrl = '';

	const onSelect = (e: Event) => {
		// @ts-ignore
		avatarUrl = e.target?.src;
		// @ts-ignore
		selectedAvatar = parseInt(e.target?.alt);
	};

	const onSubmitAvatar = async () => {
		submitLoading = true;
		const url = '/api/users';
		const payload = {
			avatar: {
				url: avatarUrl
			}
		};
		const options = {
			method: 'PATCH',
			body: JSON.stringify(payload)
		};
		const res = await fetch(url, options);
		const data = await res.json();

		submitLoading = false;
		await invalidateAll();

		reloadUser();
		// @ts-ignore
		document.getElementById('avatar-modal').checked = false;
	};
</script>

<div class="modal">
	<div class="modal-box relative">
		<label for="avatar-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Choose your avatar</h3>
		<form class="grid grid-cols-4 gap-5 my-5">
			{#each avatars as { path }, index}
				<button on:click={onSelect} name={path}>
					<div class="avatar">
						<div
							class={selectedAvatar === index
								? 'w-18 rounded-full ring-4 ring-green-400 bg-gray-100'
								: 'w-18 rounded-full bg-gray-100'}
						>
							<img src={`/avatars/${path}`} alt={`${index}`} />
						</div>
					</div>
				</button>
			{/each}
		</form>
		<button
			class={submitLoading
				? 'btn btn-active btn-primary btn-xs loading'
				: 'btn btn-active btn-primary btn-xs'}
			disabled={submitLoading}
			on:click={onSubmitAvatar}>Submit</button
		>
	</div>
</div>
