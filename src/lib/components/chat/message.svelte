<script lang="ts">
	import { page } from '$app/stores';
	import type { IMessage } from '$lib/models/message';

	import { getSince } from '$lib/utils/get';
	import { scrollIntoView } from '$lib/utils/scroll';
	import { onMount } from 'svelte';
	import MessageBody from './message_body.svelte';

	export let message: IMessage;
	export let inGame = false;
	const id = message._id.toString();
	const { user } = $page.data;
	const { sender } = message;
	const createdAt = getSince(message.createdAt);
	const senderUsername = sender.username;
	// === user.username ? 'you' : sender.username;
	onMount(() => {
		if (message.new) {
			scrollIntoView(id);
		}
	});
</script>

{#if sender._id === user._id}
	<div class={inGame ? 'chat chat-end opacity-60' : 'chat chat-end'} {id}>
		<div class="chat-header">
			{senderUsername}
			<time class="text-xs opacity-50">{createdAt}</time>
		</div>
		<div class="chat-bubble chat-bubble-accent">
			<MessageBody {message} />
		</div>
	</div>
{:else}
	<div class={inGame ? 'chat chat-start opacity-60' : 'chat chat-start'} {id}>
		<div class="chat-header">
			{senderUsername}
			<time class="text-xs opacity-50">{createdAt}</time>
		</div>
		<div class="chat-bubble chat-bubble-secondary">
			<MessageBody {message} />
		</div>
	</div>
{/if}
