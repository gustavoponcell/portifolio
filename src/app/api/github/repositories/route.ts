import { NextResponse } from "next/server";

import { getPublicDevRepositories } from "@/lib/dev-repositories";

export const revalidate = 3600;

export async function GET() {
  const result = await getPublicDevRepositories();

  return NextResponse.json(result);
}
