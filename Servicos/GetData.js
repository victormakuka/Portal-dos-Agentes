import api from '../src/components/Requisições/Urlapi'

export async function getData(token) {
    try {
        const response = await api.get("api/User/userData", {
            headers: {
                Authorization: `Bearer ${token.acessToken}`
            }
        });
        const user = response.data;
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}


