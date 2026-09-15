import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const secret = req.headers.get("sanity-webhook-secret");

    // Protect the endpoint using a shared secret
    if (!process.env.SANITY_WEBHOOK_SECRET || secret !== process.env.SANITY_WEBHOOK_SECRET) {
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
