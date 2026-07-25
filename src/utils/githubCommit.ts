export interface ProjectItem {
  projectName: string;
  description: string;
  techStack: string[];
  status: string;
  github?: string;
}

export async function commitProjectToGitHub(
  githubToken: string,
  newProject: ProjectItem
): Promise<{ success: boolean; message: string }> {
  const repoOwner = "sivaprasad-korakuti";
  const repoName = "siva-portfolio";
  const filePath = "src/data/userProjects.json";
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  try {
    // Step 1: Fetch current file content and SHA
    const getRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    let currentProjects: ProjectItem[] = [];
    let sha: string | undefined = undefined;

    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
      // Decode Base64 content handling UTF-8 characters
      const binaryString = atob(data.content.replace(/\s/g, ""));
      const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
      const decodedText = new TextDecoder().decode(bytes);
      currentProjects = JSON.parse(decodedText);
    } else if (getRes.status !== 404) {
      const errData = await getRes.json().catch(() => ({}));
      return {
        success: false,
        message: errData.message || `Failed to fetch repository data (Status ${getRes.status}). Check token permissions.`,
      };
    }

    // Step 2: Append new project avoiding duplicates by name
    const updatedProjects = [...currentProjects.filter(p => p.projectName !== newProject.projectName), newProject];
    const updatedJsonString = JSON.stringify(updatedProjects, null, 2);

    // Step 3: Encode content to Base64 (UTF-8 safe)
    const utf8Bytes = new TextEncoder().encode(updatedJsonString);
    const base64Content = btoa(String.fromCharCode(...utf8Bytes));

    // Step 4: Send PUT request to commit changes directly to repository
    const putRes = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `feat(portfolio): plant new project "${newProject.projectName}"`,
        content: base64Content,
        sha: sha,
        branch: "main",
      }),
    });

    if (putRes.ok) {
      return {
        success: true,
        message: `🎉 Project "${newProject.projectName}" committed directly to GitHub repository! Your site is updating.`,
      };
    } else {
      const errData = await putRes.json().catch(() => ({}));
      return {
        success: false,
        message: errData.message || `GitHub Commit error (Status ${putRes.status}). Verify token 'contents:write' scope.`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error connecting to GitHub API.",
    };
  }
}
