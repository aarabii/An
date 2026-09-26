export const imageFragment = /* groq */ `
    asset->{
        _id,
        url,
        metadata {
            lqip,
            dimensions {
                width,
                height,
                aspectRatio
            }
        }
    },
    alt,
    hotspot,
    crop
`;
