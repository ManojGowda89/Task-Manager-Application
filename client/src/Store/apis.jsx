import axios from "axios";

const API_URL="http://localhost:3000"

export async function userValidation(email,password,name){
try {
    const result = await axios.post(`${API_URL}/api/auth/userValidation`,{email:email,password:password,name:name})
    localStorage.setItem("token",result.data.token)
    return result.data
} catch (error) {
   console.log(error.message) 
}

}

export const validateToken = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/auth/validateToken`, {
            headers: {
                authorization: token,  
            },
        });

        if (response.data.validation) {
            console.log('Token is valid', response.data.user);
            return response.data.validation;  // Return the user data (decoded JWT payload)
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
        const response = await axios.post(`${API_URL}/api/tasks`, taskData, {
            headers: {
                authorization: token,  
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const getTasksByEmail = async (token, email) => {
    try {
        const response = await axios.get(`${API_URL}/api/tasks/${email}`, {
            headers: {
                authorization: token,  
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const updateTaskById = async (token, taskId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, updatedData, {
            headers: {
                authorization: token,  
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTaskById = async (token, taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
            headers: {
                authorization: token,  
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
