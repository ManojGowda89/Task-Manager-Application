import axios from "axios";

// URLs for both servers
const API_URL1 = "http://localhost:3000"; 
const API_URL2 = "https://task-server-production-c925.up.railway.app";  


const fetchFromApi = async (url, options, fallback = false) => {
    const apiUrl = fallback ? API_URL2 : API_URL1;
    try {
        const response = await axios(url, { ...options, baseURL: apiUrl, timeout: 5000 });  
        return response.data;
    } catch (error) {
        if (!fallback) {
            
            return fetchFromApi(url, options, true);
        }
        console.error("Both server requests failed:", error.message);
        throw error;  
    }
};

export async function userValidation(email, password, name) {
    try {
        const result = await fetchFromApi(
            "/api/auth/userValidation",
            { method: 'POST', data: { email, password, name } }
        );
        localStorage.setItem("token", result.token);
        window.location.reload();
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

export const validateToken = async (token) => {
    try {
        const response = await fetchFromApi(
            "/api/auth/validateToken",
            {
                method: 'GET',
                headers: {
                    authorization: token,
                },
            }
        );

        if (response.validation) {
            console.log('Token is valid', response.user);
            return response.validation;
        } else {
            console.log('Invalid token');
            return null;
        }
    } catch (error) {
        console.error('Error validating token', error);
        return null;
    }
};

export const createTask = async (token, taskData) => {
    try {
        const response = await fetchFromApi(
            "/api/tasks",
            {
                method: 'POST',
                headers: {
                    authorization: token,
                },
                data: taskData,
            }
        );
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const getTasksByEmail = async (token, email) => {
    try {
        const response = await fetchFromApi(
            `/api/tasks/${email}`,
            {
                method: 'GET',
                headers: {
                    authorization: token,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const updateTaskById = async (token, taskId, updatedData) => {
    try {
        const response = await fetchFromApi(
            `/api/tasks/${taskId}`,
            {
                method: 'PUT',
                headers: {
                    authorization: token,
                },
                data: updatedData,
            }
        );
        return response;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTaskById = async (token, taskId) => {
    try {
        const response = await fetchFromApi(
            `/api/tasks/${taskId}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: token,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
