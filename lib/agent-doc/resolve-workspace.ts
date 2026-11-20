import type { AgentWorkspaceContext } from "./generate-agent-doc";

type ProjectRow = {
    id?: string;
    project_name?: string;
    api_sec_key?: string;
    call_back_url?: string;
    receiver_name?: string | null;
    detail_verification?: boolean;
    before_expires?: string | null;
};

export function projectToWorkspaceContext(project: ProjectRow): AgentWorkspaceContext {
    const eligibility =
        project.before_expires instanceof Date
            ? project.before_expires.toISOString().slice(0, 10)
            : typeof project.before_expires === "string"
            ? project.before_expires.slice(0, 10)
            : null;

    return {
        workspaceId: project.id || "",
        projectName: project.project_name || "Workspace",
        apiKey: project.api_sec_key || "",
        receiverName: (project.receiver_name || "").trim(),
        webhookUrl: (project.call_back_url || "").trim(),
        verificationMode: project.detail_verification === false ? "payment_only" : "detailed",
        eligibilityStartDate: eligibility,
    };
}

export function pickProject(
    projects: ProjectRow[] | undefined,
    projectId: string | null
): ProjectRow | null {
    if (!projects?.length) return null;
    if (projectId) {
        const found = projects.find((p) => p.id === projectId);
        if (found) return found;
    }
    return projects[0];
}