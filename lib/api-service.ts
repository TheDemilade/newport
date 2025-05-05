/**
 * API Service to handle backend operations
 * In a real application, this would make actual API calls to a backend server
 */

// Simulate API endpoints
const API_ENDPOINTS = {
  SAVE_PORTFOLIO: "/api/portfolio/save",
  SHARE_PORTFOLIO: "/api/portfolio/share",
  GET_PORTFOLIO: "/api/portfolio/get",
}

/**
 * Save portfolio data to the backend
 * @param data Portfolio data to save
 * @returns Promise that resolves when the save is complete
 */
export async function savePortfolioToBackend(data: any): Promise<{ success: boolean; message: string }> {
  // Simulate network request
  console.log(`[API] Saving portfolio data to ${API_ENDPOINTS.SAVE_PORTFOLIO}`, data)

  // Simulate a delay to mimic network latency
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate successful response
  return {
    success: true,
    message: "Portfolio saved successfully and pushed to repository",
  }
}

/**
 * Share portfolio and get a shareable link
 * @param portfolioId ID of the portfolio to share
 * @returns Promise that resolves with the shareable link
 */
export async function getShareableLink(portfolioId: string): Promise<{ url: string; expiresAt?: string }> {
  // Simulate network request
  console.log(`[API] Getting shareable link for portfolio ${portfolioId}`)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate a fake URL
  const baseUrl = window.location.origin
  const shareableUrl = `${baseUrl}/shared/${portfolioId}`

  return {
    url: shareableUrl,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  }
}

/**
 * Get portfolio data from the backend
 * @param portfolioId ID of the portfolio to retrieve
 * @returns Promise that resolves with the portfolio data
 */
export async function getPortfolioFromBackend(portfolioId: string): Promise<any> {
  // Simulate network request
  console.log(`[API] Getting portfolio data for ${portfolioId}`)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would fetch from the backend
  // For now, we'll just return the data from localStorage
  const data = localStorage.getItem(`shared_portfolio_${portfolioId}`)

  if (!data) {
    throw new Error("Portfolio not found")
  }

  return JSON.parse(data)
}
