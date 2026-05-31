import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import { PasswordGenerator } from "@/features/password-generator/password-generator";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage(): JSX.Element {
	return <PasswordGenerator />;
}
