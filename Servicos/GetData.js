import api from '../src/components/Requisições/Urlapi'

export function getData(token){
    return api.get("api/User/userData", {
        headers: {
            Authorization: `Bearer ${token.acessToken}`
        }
    }).then((response) => {
        const user = response.data;
        // console.log("User data fetched successfully:", user);
        // sessionStorage.setItem('user', JSON.stringify(user));
        return user;
    }).catch((error) => {
        console.error("Error fetching user data:", error);
        throw error; // Re-throw the error for further handling if needed
    });
}

