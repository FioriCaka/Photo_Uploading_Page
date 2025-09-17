import { IKImage } from "imagekitio-react";

// A small wrapper around IKImage that:
// - Uses ImageKit path-based delivery for assets stored in ImageKit (e.g., "/folder/file.png").
// - For absolute external URLs (e.g., "https://picsum.photos/..."), builds an ImageKit fetch URL
//   like `${endpoint}/tr:h-..,w-../https://picsum.photos/...` to preserve the double slash and avoid 404s.
const Image = ({ path, src, alt, className, w, h }) => {
	const endpoint = import.meta.env.VITE_URL_IK_ENDPOINT;
	const input = src ?? path;

	if (!input) return null;

	const isDataUri = typeof input === "string" && input.startsWith("data:");
	const isExternalHttp =
		typeof input === "string" && /^https?:\/\//i.test(input);

	// Build transformation string for fetch URL style
	const trParts = [];
	if (h) trParts.push(`h-${h}`);
	if (w) trParts.push(`w-${w}`);
	const trPath = trParts.length ? `/tr:${trParts.join(",")}` : "";

	if (isDataUri) {
		// For data URIs, just render directly
		return <img src={input} alt={alt} loading="lazy" className={className} />;
	}

	if (isExternalHttp) {
		// Construct a full ImageKit fetch URL to the external resource.
		// Important: Keep the double slashes in "https://" part intact.
		const ikSrc = `${endpoint}${trPath}/${input}`;
		return (
			<img
				src={ikSrc}
				alt={alt}
				loading="lazy"
				className={className}
				onError={(e) => {
					// Fallback: load the original external URL if ImageKit fetch fails (e.g., 404)
					if (e.currentTarget.dataset.fallback !== "1") {
						e.currentTarget.dataset.fallback = "1";
						e.currentTarget.src = input;
					}
				}}
			/>
		);
	}

	// Default: treat as ImageKit-stored asset using path
	return (
		<IKImage
			urlEndpoint={endpoint}
			path={input}
			transformation={h || w ? [{ height: h, width: w }] : undefined}
			alt={alt}
			loading="lazy"
			className={className}
			lqip={{ active: true, quality: 20 }}
		/>
	);
};

export default Image;
