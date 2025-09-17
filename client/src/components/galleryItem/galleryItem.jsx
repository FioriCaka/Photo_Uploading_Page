import "./galleryItem.css";
import { Link } from "react-router";
import Image from "../image/image";

const GalleryItem = ({ item }) => {
	if (!item) return null;
	const width = item.width ?? 1;
	const height = item.height ?? 1;
	const optimizedHeight = (372 * height) / width;
	const id = item._id ?? item.id;

	return (
		<div
			className="galleryItem"
			style={{ gridRowEnd: `span ${Math.ceil(height / 100)}` }}
		>
			<Image path={item.media} alt="" w={372} h={optimizedHeight} />
			{id ? <Link to={`/pin/${id}`} className="overlay" /> : null}
			<button className="saveButton">Save</button>
			<div className="overlayIcons">
				<button>
					<Image path="/general/share.svg" alt="" />
				</button>
				<button>
					<Image path="/general/more.svg" alt="" />
				</button>
			</div>
		</div>
	);
};

export default GalleryItem;
