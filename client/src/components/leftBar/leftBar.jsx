import Image from "../image/image";
import "./leftBar.css";

const LeftBar = () => {
	return (
		<div className="leftBar">
			<div className="menuIcons">
				<a href="/" className="menuIcon">
					<Image path="/general/logo.png" alt="" id="logo" w={48} />
				</a>
				<a href="/" className="menuIcon">
					<Image path="/general/home.svg" alt="" />
				</a>
				<a href="/create" className="menuIcon">
					<Image path="/general/create.svg" alt="" />
				</a>
				<a href="/updates" className="menuIcon">
					<Image path="/general/updates.svg" alt="" />
				</a>
				<a href="/messages" className="menuIcon">
					<Image path="/general/messages.svg" alt="" />
				</a>
			</div>
			<a href="/settings">
				<Image path="/general/settings.svg" alt="" />
			</a>
		</div>
	);
};
export default LeftBar;
