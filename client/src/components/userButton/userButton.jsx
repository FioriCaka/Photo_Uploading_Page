import Image from "../image/image";
import "./userButton.css";
import { useState } from "react";

const UserButton = () => {
	const [open, setOpen] = useState(false);
	const currentUser = true;
	return currentUser ? (
		<div className="userButton">
			<Image path="/general/noAvatar.png" alt="" />
			<Image
				onClick={() => setOpen((prev) => !prev)}
				className="arrow"
				path="/general/arrow.svg"
				alt=""
			/>
			{open && (
				<div className="userOptions">
					<div className="userOption">Profile</div>
					<div className="userOption">Settings</div>
					<div className="userOption">Logout</div>
				</div>
			)}
		</div>
	) : (
		<a href="/" className="loginLink">
			Login / Signup
		</a>
	);
};
export default UserButton;
