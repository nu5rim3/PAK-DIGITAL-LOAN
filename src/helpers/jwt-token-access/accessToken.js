const AccessToken = `Bearer ${localStorage.getItem('access_token')}`;
const AuthToken =  localStorage.getItem('x-auth-token');

export default {
    AccessToken,
    AuthToken
}