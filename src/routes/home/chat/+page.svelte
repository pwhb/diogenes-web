<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/avatar.svelte';
	import { getSince, getTheOtherUser } from '$lib/utils/get';

	const { rooms, user } = $page.data;
</script>

<div class="mx-2 md:mx-16">
	<h1>Friend List</h1>

	{#if rooms}
		{#each rooms as { members, _id, lastMessage }}
			<a href={`/chat/${_id}`} class="p-3 flex flex-row gap-5 items-center">
				<Avatar user={getTheOtherUser(members, user._id)} />
				<div>
					<p class="text font-bold">
						{getTheOtherUser(members, user._id)?.username}
						{#if lastMessage}
							<time class="text-xs opacity-50">{getSince(lastMessage?.createdAt)}</time>
						{/if}
					</p>
					{#if lastMessage && lastMessage.body}
						<p>{lastMessage.sender.username}: {lastMessage.body}</p>
					{:else}
						<p>start a new conversation ...</p>
					{/if}
				</div>
			</a>
		{/each}
	{:else}
		<p>Add some friends to chat</p>
	{/if}
</div>
