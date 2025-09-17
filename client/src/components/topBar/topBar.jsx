import "./topBar.css";
import UserButton from "../userButton/userButton";
import Image from "../image/image";

const TopBar = () => {
	return (
		<div className="topBar">
			{/* SEARCH BAR */}
			<div className="search">
				<Image path="/general/search.svg" alt="logo" />
				<input type="text" placeholder="Search..." />
			</div>
			{/* USER */}
			<UserButton />
		</div>
	);
};
export default TopBar;
