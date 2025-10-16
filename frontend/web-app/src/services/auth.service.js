import api from './api.service';
import storageService from './storage.service';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    storageService.setToken(response.data.token);
    return response.data;
  },
  signup: async (userInfo) => {
    const response = await api.post('/auth/signup', userInfo);
    storageService.setToken(response.data.token);
    return response.data;
  },
  logout: () => {
    storageService.removeToken();
  },
};
export default authService;
