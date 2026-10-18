const RAW_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Accept both:
//   http://localhost:5000
//   http://localhost:5000/api
// without ever producing /api/api/...
const API_BASE_URL = `${RAW_API_URL.replace(/\/+$/, "").replace(/\/api$/, "")}/api`;

// ========================================
// API Response Type
// ========================================

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  user?: T;
};

// ========================================
// Generic API Request
// ========================================

const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,

    // Send authentication cookies
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ========================================
// Authentication API
// ========================================

export const authApi = {
  // ========================================
  // Signup
  // ========================================

  signup: async (data: { name: string; email: string; password: string }) => {
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // ========================================
  // Login
  // ========================================

  login: async (data: { email: string; password: string }) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // ========================================
  // Get Current User
  // ========================================

  me: async () => {
    return apiRequest("/auth/me", {
      method: "GET",
    });
  },

  // ========================================
  // Logout
  // ========================================

  logout: async () => {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  },
};
