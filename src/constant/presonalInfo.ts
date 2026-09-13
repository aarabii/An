export const PERSONAL_INFO = {
    name: "Aarab Nishchal",
    firstName: "Aarab",
    lastName: "Nishchal",

    DOB: {
        d: 9,
        m: 8,
        y: 2004,
    },

    profile_image: "/images/me1.png",
    profile_image_alt: "Aarab Nishchal - AI Enginner & Software Developer",

    custom_roles: ["AI Engineer", "Software Engineer"],

    currentProfession: {
        role: "AI Engineer",
        company: "Ascend HSI",
    },

    bio: "Stay GOATed.",

    location: {
        city: "Katihar",
        state: "Bihar",
        country: "India",
    },
    timeZone: {
        offset: 5.5,
        name: "Asia/Kolkata",
    },

    contact_email: "hello@aarab.me",
} as const;
