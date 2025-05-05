import { savePortfolioToGitHub } from "@/app/actions/github-actions"

export async function sharePortfolio() {
  try {
    // Get the current portfolio data
    const portfolioData = window.portfolioData || {}

    // Add metadata for sharing
    const sharedData = {
      ...portfolioData,
      isShared: true,
      shareDate: new Date().toISOString(),
    }

    // Save to localStorage for local persistence
    localStorage.setItem("portfolio-data", JSON.stringify(sharedData))

    // Save to GitHub using the server action
    const result = await savePortfolioToGitHub(sharedData)

    if (!result.success) {
      throw new Error(result.error || "Failed to save portfolio to GitHub")
    }

    // Copy the shareable link to clipboard
    const shareableUrl = result.url
    await navigator.clipboard.writeText(shareableUrl)

    return {
      success: true,
      url: shareableUrl,
    }
  } catch (error) {
    console.error("Error sharing portfolio:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
