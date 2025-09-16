/**
 * Individual Blog Post API - Returns a specific blog post by slug
 */

export default async function handler(req, res) {
  const { slug } = req.query;
  
  // Mock blog posts for demonstration
  const mockBlogPosts = {
    "comparative-negligence-fontana-car-accident": {
      title: "Navigating California's Comparative Negligence Laws After a Fontana Car Accident",
      content: `
        <h2>Understanding Comparative Negligence in California</h2>
        <p>If you've been injured in a car accident in Fontana or anywhere in San Bernardino County, understanding California's comparative negligence laws is crucial to protecting your rights and maximizing your compensation.</p>
        
        <h3>What is Comparative Negligence?</h3>
        <p>California follows a "pure comparative negligence" rule. This means that even if you were partially at fault for the accident, you can still recover damages – but your compensation will be reduced by your percentage of fault.</p>
        
        <h3>How It Works in Fontana Car Accidents</h3>
        <p>For example, if you were involved in a collision on Sierra Avenue and the total damages were $100,000, but you were found to be 20% at fault, you could still recover $80,000 (80% of the total damages).</p>
        
        <h3>Common Scenarios in San Bernardino County</h3>
        <ul>
          <li>Speeding on I-10 through Fontana when another driver runs a red light</li>
          <li>Not wearing a seatbelt when hit by a drunk driver</li>
          <li>Making an improper lane change when rear-ended</li>
        </ul>
        
        <h3>Why You Need a Fontana Car Accident Lawyer</h3>
        <p>Insurance companies will try to maximize your fault percentage to minimize their payout. An experienced car accident attorney in Fontana can:</p>
        <ul>
          <li>Gather evidence to minimize your fault percentage</li>
          <li>Negotiate with insurance companies</li>
          <li>Ensure you receive fair compensation</li>
        </ul>
        
        <h3>Get Help Today</h3>
        <p>Don't let the insurance companies take advantage of you. If you've been in a car accident in Fontana, contact our experienced attorneys for a free consultation.</p>
      `,
      publishDate: "2025-09-16T06:03:45.119Z",
      author: "Fontana Car Accident Legal Team"
    },
    "fontana-car-accident-immediate-steps": {
      title: "Fontana Car Accident? What to Do Immediately After the Crash",
      content: `
        <h2>Essential Steps After a Car Accident in Fontana</h2>
        <p>Being involved in a car accident on Fontana's busy streets like Sierra Avenue or Foothill Boulevard can be overwhelming. Here's what you need to do immediately:</p>
        
        <h3>1. Ensure Safety First</h3>
        <ul>
          <li>Check yourself and passengers for injuries</li>
          <li>Move to a safe location if possible</li>
          <li>Turn on hazard lights</li>
        </ul>
        
        <h3>2. Call 911</h3>
        <p>Always call the police, especially for accidents in high-traffic areas like the I-10 and I-15 interchange. A police report is crucial for your claim.</p>
        
        <h3>3. Document Everything</h3>
        <ul>
          <li>Take photos of all vehicles involved</li>
          <li>Photograph the accident scene from multiple angles</li>
          <li>Get witness contact information</li>
          <li>Note weather and road conditions</li>
        </ul>
        
        <h3>4. Exchange Information</h3>
        <p>Get the following from all drivers involved:</p>
        <ul>
          <li>Name and contact information</li>
          <li>Insurance company and policy number</li>
          <li>Driver's license number</li>
          <li>License plate number</li>
        </ul>
        
        <h3>5. Seek Medical Attention</h3>
        <p>Even if you feel fine, see a doctor. Some injuries, like whiplash, may not show symptoms immediately.</p>
        
        <h3>6. Contact a Fontana Car Accident Lawyer</h3>
        <p>Before speaking with insurance companies, consult with an experienced attorney who knows Fontana's roads and California law.</p>
      `,
      publishDate: "2025-09-16T06:07:19.873Z",
      author: "Fontana Car Accident Legal Team"
    }
  };
  
  const post = mockBlogPosts[slug];
  
  if (!post) {
    return res.status(404).json({ error: "Blog post not found" });
  }
  
  res.status(200).json({
    success: true,
    post: {
      ...post,
      slug: slug,
      url: `/blog/${slug}`
    }
  });
}