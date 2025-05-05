"use server"

import { revalidatePath } from "next/cache"

/**
 * Save portfolio data to GitHub repository
 * This function runs on the server, keeping the GitHub token secure
 */
export async function savePortfolioToGitHub(data: any) {
  try {
    const token = process.env.GITHUB_TOKEN // No NEXT_PUBLIC_ prefix

    if (!token) {
      throw new Error("GitHub token is not configured")
    }

    const owner = "TheDemilade"
    const repo = "newport"
    const path = `thedemilade.json`
    const message = `Update portfolio`
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64")

    // Check if file exists first to get the SHA if it does
    let sha: string | undefined
    try {
      const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (checkRes.ok) {
        const fileInfo = await checkRes.json()
        sha = fileInfo.sha
      }
    } catch (error) {
      console.log("File does not exist yet, will create it")
    }

    // Create or update the file
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content,
        branch: "main",
        sha, // Include SHA if updating an existing file
        committer: { name: "TheDemilade", email: "odesanyademilade@gmail.com" },
        author: { name: "TheDemilade", email: "odesanyademilade@gmail.com" },
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(`GitHub API error: ${res.status} ${JSON.stringify(errorData)}`)
    }

    const result = await res.json()

    // Revalidate the path to ensure the latest data is shown
    revalidatePath("/view/thedemilade")

    return {
      success: true,
      url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/view/thedemilade`,
      data: result,
    }
  } catch (error) {
    console.error("Error saving to GitHub:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
