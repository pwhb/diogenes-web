<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getTheOtherUser } from '$lib/utils/get';
	import Icon from '@iconify/svelte';
	import SmallAvatar from '../common/small_avatar.svelte';
	const { room, user } = $page.data;
	const otherUser = getTheOtherUser(room.members, user._id);

	const goBack = () => {
		const path = '/home/chat';
		goto(path);
	};
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<button on:click={goBack}>
			<Icon icon="ic:baseline-arrow-back-ios" width="24" />
		</button>
	</div>
	<div class="navbar-center">
		<div class="flex flex-row gap-3 items-center justify-center">
			<SmallAvatar user={otherUser} />
			<a class="font-medium" href={`/users/${otherUser._id}`}>{otherUser.username}</a>
		</div>
	</div>
	<div class="navbar-end">
		<!-- <button class="btn btn-ghost btn-circle">
			<div class="indicator">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/></svg
				>
				<span class="badge badge-xs badge-primary indicator-item" />
			</div>
		</button> -->
	</div>
</div>
