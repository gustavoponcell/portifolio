import { NextResponse } from "next/server";

import { getGitHubRepositories } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  const result = await getGitHubRepositories();

  return NextResponse.json(result);
}
