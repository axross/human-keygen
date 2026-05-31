import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { JSX, ReactNode } from "react";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				name: "description",
				content:
					"Generate memorable layout-aware passwords locally in your browser.",
			},
			{ title: "Human Keygen" },
		],
		links: [
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "stylesheet", href: appCss },
		],
	}),
	component: RootComponent,
});

interface RootDocumentProps {
	children: ReactNode;
}

function RootComponent(): JSX.Element {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: RootDocumentProps): JSX.Element {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
