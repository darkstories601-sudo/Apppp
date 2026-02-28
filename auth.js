import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'cc_user';

export const Auth = {
  async get()          { try { const r = await AsyncStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; } },
  async isLoggedIn()   { return (await this.get()) !== null; },
  async login(email, name) {
    const user = { email, name: name || email.split('@')[0], loginTime: Date.now() };
    await AsyncStorage.setItem(KEY, JSON.stringify(user));
    return user;
  },
  async logout()       { await AsyncStorage.removeItem(KEY); },
};
