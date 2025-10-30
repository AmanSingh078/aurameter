import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines | AuraMeter",
  description: "Aurameter Community Guidelines - Cultivating a positive, respectful, and authentic digital space for all users.",
};

export default function CommunityGuidelinesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}