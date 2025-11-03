// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: { "Content-Type": "application/json" },
});


const CRED_KEY = "admin_auth";

/** Save credentials to localStorage (call this after successful login) */
export function saveCredentials(email, password) {
    if (!email || !password) return;
    localStorage.setItem(CRED_KEY, JSON.stringify({ email, password }));
}

/** Clear credentials */
export function clearCredentials() {
    localStorage.removeItem(CRED_KEY);
}

/** Read credentials */
export function getCredentials() {
    try {
        const raw = localStorage.getItem(CRED_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        console.log("e: ", e);
        return null;
    }
}

/**
 * Request interceptor:
 * - If credentials exist, attach them automatically.
 * - For GET/DELETE attach as query params (safe & standard).
 * - For other methods attach as request body JSON (merge).
 * - If data is FormData, append creds to it.
 */
axiosInstance.interceptors.request.use(
    (config) => {
        const creds = getCredentials();
        if (!creds) return config; // nothing to attach

        const { email, password } = creds;
        const method = (config.method || "get").toLowerCase();

        // Attach to params for GET and DELETE (safer since GET bodies are not reliable)
        if (method === "get" || method === "delete") {
            config.params = { ...(config.params || {}), email, password };
            return config;
        }

        // For methods that have a body (POST, PUT, PATCH)
        // If body is FormData => append
        if (config.data instanceof FormData) {
            config.data.append("email", email);
            config.data.append("password", password);
            return config;
        }

        // If no data set yet, create one
        if (!config.data) {
            config.data = { email, password };
            return config;
        }

        // If data is an object, merge creds (creds first so request data can override if needed)
        if (typeof config.data === "object") {
            config.data = { email, password, ...config.data };
            return config;
        }

        // If data is a JSON string, try to parse & merge, then re-stringify
        if (typeof config.data === "string") {
            try {
                const parsed = JSON.parse(config.data);
                if (parsed && typeof parsed === "object") {
                    config.data = JSON.stringify({ email, password, ...parsed });
                }
            } catch (e) {
                console.log("e: ", e);
                // can't parse string body - leave as-is
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
