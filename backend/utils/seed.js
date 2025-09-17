import User from "../models/user.model.js";
import Pin from "../models/pin.model.js";
import Board from "../models/board.model.js";
import Comment from "../models/comment.model.js";
import bcrypt from "bcryptjs";
import connectDB from "./connectDB.js";
import mongoose from "mongoose";

// Ensure we are connected before operating on collections
await connectDB();

// Drop obsolete/legacy indexes that conflict with current schema (if collection exists)
try {
	const collInfo = await mongoose.connection.db
		.listCollections({ name: User.collection.name })
		.toArray();
	if (collInfo.length > 0) {
		const indexes = await User.collection.indexes();
		const hasLegacyNameIndex = indexes.some((ix) => ix.name === "name_1");
		if (hasLegacyNameIndex) {
			await User.collection.dropIndex("name_1");
			console.log("Dropped legacy index: users.name_1");
		}
	}
} catch (err) {
	// Ignore when the namespace or index doesn't exist
	if (
		err?.codeName === "NamespaceNotFound" ||
		err?.codeName === "IndexNotFound" ||
		err?.code === 26 ||
		err?.code === 27
	) {
		// no-op
	} else {
		console.warn("Warning: unable to drop legacy users.name_1 index:", err);
	}
}

const seedDB = async () => {
	await User.deleteMany({});
	await Pin.deleteMany({});
	await Board.deleteMany({});
	await Comment.deleteMany({});

	const users = [];
	for (let i = 1; i <= 10; i++) {
		const hashedPassword = await bcrypt.hash("password123", 10);
		const user = new User({
			displayName: `User ${i}`,
			username: `user${i}`,
			email: `user${i}@example.com`,
			hashedPassword: hashedPassword,
			img: `https://picsum.photos/id/${i}/200/200`,
		});
		users.push(await user.save());
	}

	const boards = [];
	for (const user of users) {
		for (let i = 1; i <= 10; i++) {
			const board = new Board({
				title: `Board ${i} of ${user.username}`,
				user: user._id,
			});
			boards.push(await board.save());
		}
	}

	const pins = [];
	for (const user of users) {
		const userBoards = boards.filter(
			(board) => board.user.toString() === user._id.toString()
		);
		for (let i = 1; i <= 10; i++) {
			const mediaSize = Math.random() < 0.5 ? "800/1200" : "800/600";
			const pin = new Pin({
				media: `https://picsum.photos/id/${i + 10}/${mediaSize}`,
				width: 800,
				height: mediaSize === "800/1200" ? 1200 : 600,
				title: `Pin ${i} by ${user.username}`,
				description: `This is pin ${i} created by ${user.username}`,
				link: `https://example.com/pin${i}`,
				board: userBoards[i - 1]._id,
				tags: [`tag${i}`, "sample", user.username],
				user: user._id,
			});
			pins.push(await pin.save());
		}
	}

	for (const user of users) {
		for (let i = 1; i <= 10; i++) {
			const randomPin = pins[Math.floor(Math.random() * pins.length)];
			const comment = new Comment({
				description: `Comment ${i} by ${user.username}: This is a great pin!`,
				pin: randomPin._id,
				user: user._id,
			});
			await comment.save();
		}
	}

	console.log("Database seeded successfully!");
	process.exit(0);
};

seedDB().catch((error) => {
	console.error("Error seeding database:", error);
	process.exit(1);
});
