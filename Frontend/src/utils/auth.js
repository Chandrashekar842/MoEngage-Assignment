export const isTokenValid = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return false;

    // Decode the token to check expiration
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;

    return decodedToken && decodedToken.exp > currentTime;
};