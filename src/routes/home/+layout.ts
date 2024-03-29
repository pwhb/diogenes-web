import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const url1 = `/api/followings`;
	const res1 = await fetch(url1);
	const { followers, followings } = await res1.json();

	const url2 = `/api/avatars`;
	const res2 = await fetch(url2);
	const { data } = await res2.json()
	return {
		followings,
		followers,
		avatars: data
	};
};
