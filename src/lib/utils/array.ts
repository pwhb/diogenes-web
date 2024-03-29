export const safePush = (array: any[], item: any) => {
	if (array) {
		array.push(item);
	} else {
		array = [item];
	}
};

export const checkAndSafePush = (array: any[], item: any) => {
	if (array && !array.includes(item)) {
		array.push(item);
	} else if (!array) {
		array = [item];
	}
};

export const checkAndSafePop = (array: any[], item: any) => {
	if (array && array.includes(item)) {
		array = array.filter((val) => val != item);
	} else if (!array) {
		array = [];
	}
};

// if (userFollowed.rooms) {
//     userFollowed.rooms.push(newRoom._id);
// } else {
//     userFollowed.rooms = [newRoom._id];
// }

// if (userFollowing.friends && !userFollowing.friends.includes(userFollowed._id)) {
//     userFollowing.friends.push(userFollowed._id);
// } else {
//     userFollowing.friends = [userFollowed._id];
// }
