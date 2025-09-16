/**
 * Blog Listing API - Shows all blog posts
 */

export default async function handler(req, res) {
  // For now, return the in-memory blog posts
  // In production, this would connect to a database
  
  const mockBlogPosts = [
    {
      id: 1,
      title: "Navigating California's Comparative Negligence Laws After a Fontana Car Accident",
      slug: "comparative-negligence-fontana-car-accident",
      excerpt: "Were you injured in a car accident in Fontana or San Bernardino County? Understanding California's comparative negligence laws is crucial to protecting your rights.",
      publishDate: "2025-09-16T06:03:45.119Z",
      url: "/blog/comparative-negligence-fontana-car-accident",
      keywords: ["fontana car accident lawyer", "car accident attorney fontana", "personal injury lawyer san bernardino county"]
    },
    {
      id: 2,
      title: "Fontana Car Accident? What to Do Immediately After the Crash",
      slug: "fontana-car-accident-immediate-steps",
      excerpt: "Were you in a car accident in Fontana? Knowing what to do immediately after a crash can protect your rights and your health. Get expert legal advice.",
      publishDate: "2025-09-16T06:07:19.873Z",
      url: "/blog/fontana-car-accident-immediate-steps",
      keywords: ["fontana car accident lawyer", "car accident attorney fontana", "car accident fontana"]
    }
  ];
  
  // Return blog listing
  res.status(200).json({
    success: true,
    totalPosts: mockBlogPosts.length,
    posts: mockBlogPosts,
    message: "Blog system is active and generating daily content"
  });
}