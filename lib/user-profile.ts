const GENERIC_NAMES = new Set([
    "merchant",
    "yegna developer",
    "github user",
    "user",
    "",
]);

export type UserProfileInput = {
    full_name?: string | null;
    email?: string | null;
    avatar_url?: string | null;
    github_username?: string | null;
    payment_plan?: string | null;
    image?: string | null;
};

export function resolveProfileDisplay(
    user: UserProfileInput | null | undefined,
    sessionUser?: { name?: string | null; email?: string | null; image?: string | null } | null
) {
    const sessionName = sessionUser?.name?.trim() || "";
    const dbName = user?.full_name?.trim() || "";
    const githubUsername = user?.github_username?.trim().replace(/^@/, "") || "";

    let displayName = githubUsername;
    if (!displayName) {
        if (dbName && !GENERIC_NAMES.has(dbName.toLowerCase())) displayName = dbName;
        else if (sessionName && !GENERIC_NAMES.has(sessionName.toLowerCase())) displayName = sessionName;
    }
    if (!displayName && user?.email) {
        displayName = user.email.split("@")[0] || "Account";
    }
    if (!displayName) displayName = "Account";

    const avatarUrl =
        sessionUser?.image?.trim() ||
        user?.avatar_url?.trim() ||
        user?.image?.trim() ||
        "";

    const subtitle =
        user?.email ||
        sessionUser?.email ||
        (user?.payment_plan === "free" ? "Free tier" : user?.payment_plan || "Yegna Pay");

    return {
        displayName: githubUsername ? `@${githubUsername}` : displayName,
        rawHandle: githubUsername || displayName,
        avatarUrl,
        subtitle,
    };
}