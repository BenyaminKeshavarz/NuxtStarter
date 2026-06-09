/**
 * API configuration composable that provides typed endpoints and base URL
 */
export const useApiConfig = () => {
  // Access the runtime config
  const config = useRuntimeConfig();

  // Get the API Base URL from the public section
  const { apiBaseUrl } = config.public;

  enum ApiVersion {
    V1 = "api/v1",
  }

  /*
   * -------------------------------------------------------
   * ### API Endpoint Configuration
   * -------------------------------------------------------
     Define structured API endpoints for different resources
     Each key represents a different functionality in the application
   * ------------------------------------------------------- */
  const apiEndpoints = {
// * Blogs Endpoints
blogs: {
  getAll: `${apiBaseUrl}/${ApiVersion.V1}/Blogs/GetAll`,
  getDetails: `${apiBaseUrl}/${ApiVersion.V1}/Blogs`,
  getCategories: `${apiBaseUrl}/${ApiVersion.V1}/Blogs/GetAlreadyBlogCategories`,
},

// * Contact Endpoints
contacts: {
  create: `${apiBaseUrl}/${ApiVersion.V1}/Contacts`,
  getFAQ: `${apiBaseUrl}/${ApiVersion.V1}/FAQs`,
},

// * Products Endpoints
products: {
  getAll: `${apiBaseUrl}/${ApiVersion.V1}/products`,
  getFiltersAttribute: `${apiBaseUrl}/${ApiVersion.V1}/attributes/getAttributeItems`,
},

    // TODO: Config your endpoints...
  };

  return {
    apiBaseUrl,
    apiEndpoints,
  };
};
