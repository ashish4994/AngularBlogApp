
(function(window) {
    window.__env = window.__env || {};
  
    // Auth API URL
    window.__env.authApiUrl = window.__env.authApiUrl || 'http://localhost:3001/';
  
    // Blog Service API URL
    window.__env.blogServiceApiUrl = window.__env.blogServiceApiUrl || 'http://localhost:8082/';
  
    // Comments Service URL
    window.__env.commentsServiceUrl = window.__env.commentsServiceUrl || 'http://localhost:5002/';
  
    // More environment variables can be added here
  })(this);
  