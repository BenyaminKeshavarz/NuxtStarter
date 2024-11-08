export const useApiConfig = () => {
  // Access the runtime config
  const config = useRuntimeConfig();

  // Get the API Base URL from the public section
  const { apiBaseUrl } = config.public;

  /*
   * -------------------------------------------------------
   * ### API Endpoint Configuration
   * -------------------------------------------------------
     Define structured API endpoints for different resources
     Each key represents a different functionality in the application
   * ------------------------------------------------------- */
  const apiEndpoints = {
    // * Authentication Endpoints
    login: `${apiBaseUrl}/api/auth/login`, // User login endpoint
    register: `${apiBaseUrl}/api/auth/register`, // User registration endpoint
    logout: `${apiBaseUrl}/api/auth/logout`, // User logout endpoint
    refreshToken: `${apiBaseUrl}/api/auth/refresh-token`, // Token refresh endpoint

    // * Blogs Endpoints
    getBlogs: `${apiBaseUrl}/api/blogs`, // Fetch all blogs
    getBlogPostDetails: (slugOrId) => `${apiBaseUrl}/api/blogs/${slugOrId}`, // Fetch blog post details by ID or slug (dynamically)
    getBlogsCategories: `${apiBaseUrl}/api/blogs/categories`, // Fetch blogs categories

    // * Portfolios Endpoints
    getPortfolios: `${apiBaseUrl}/api/portfolios`, // Fetch all portfolios
    getPortfolioItemDetails: (slugOrId) =>
      `${apiBaseUrl}/api/portfolios/${slugOrId}`, // Fetch portfolio item details by ID or slug (dynamically)

    // * Contact Form Endpoints
    contactFormSubmit: `${apiBaseUrl}/api/contact/submit`, // Submit contact form

    // * General Endpoints
    getSiteSettings: `${apiBaseUrl}/api/settings`, // Fetch site settings or configuration

    // TODO: Config your endpoints...
  };

  return {
    apiBaseUrl,
    apiEndpoints,
  };
};
