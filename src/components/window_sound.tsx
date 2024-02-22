/** @format */
"use client";

import React, { useRef, useEffect, useState } from "react";

export default function WindowSound({
	children,
	src,
	...rest
}: {
	children: React.ReactElement;
	src: string;
	[key: string]: any;
}): React.ReactElement {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [audioPlaying, setAudioPlaying] = useState(true);

	const handleVisibilityChange = () => {
		if (document.hidden) {
			setAudioPlaying(false);
		} else {
			setAudioPlaying(true);
		}
	};

	useEffect(() => {
		if (audioRef.current) {
			if (audioPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [audioPlaying]);

	return (
		<div style={{ width: "100%", height: "100%" }} {...rest}>
			{children}
			<audio ref={audioRef} src={src} loop autoPlay controls={false}></audio>
		</div>
	);
}
