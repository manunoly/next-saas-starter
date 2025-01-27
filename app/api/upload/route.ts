import { db } from "@/lib/db/drizzle";
import { after, NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { users, uploads } from "@/lib/db/schema";
import { getUser } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not found or invalid" },
      { status: 401 }
    );
  }

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replace(/\s/g, "-");
  const filepath = path.join("uploads", filename);
  const fullpath = path.join(process.cwd(), "public", filepath);

  try {
    //Only assets that are in the public directory at build time will be served by Next.js. Files added at request time won't be available. We recommend using a third-party service like Vercel Blob Storage for this use case.
    await writeFile(fullpath, buffer);
    // after(async () => {
    await db.insert(uploads).values({
      filename,
      filepath,
      mimetype: file.type ?? formData.get("type") ?? "unknown",
      userId: user.id,
    });
    // });
    return NextResponse.json({
      message: "File uploaded successfully",
      filename,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Error saving file" }, { status: 500 });
  }
}
