import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const secret = req.headers.get("sanity-webhook-secret");
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;

    // Protect the endpoint using a shared secret with constant-time comparison
    if (!expectedSecret || !secret) {
        return new Response("Unauthorized", { status: 401 });
    }

    const secretBuffer = Buffer.from(secret);
    const expectedBuffer = Buffer.from(expectedSecret);

    if (
        secretBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(secretBuffer, expectedBuffer)
    ) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { _type, slug } = body;

        if (_type) {
            // Revalidate general tag (e.g. 'post', 'project', 'resource')
            revalidateTag(_type, "max");

            // If a specific document slug is included, also revalidate the item-specific tag
            if (slug?.current) {
                revalidateTag(`${_type}:${slug.current}`, "max");
            }

            return NextResponse.json({
                revalidated: true,
                now: Date.now(),
                tag: _type,
                slug: slug?.current,
            });
        }

        return NextResponse.json(
            { message: "No _type in payload" },
            { status: 400 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Error executing revalidation", error: String(err) },
            { status: 500 }
        );
    }
}
