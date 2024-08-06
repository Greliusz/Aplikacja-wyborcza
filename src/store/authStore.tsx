import { makeAutoObservable, action, runInAction } from 'mobx';
import { getVoters } from '../apiService';

class AuthStore {
  isAuthenticated = false;
  user: { username: string } | null = null;
  hasVoted = false;

  constructor() {
    makeAutoObservable(this);
  }

  login = action((user: { username: string }) => {
    this.isAuthenticated = true;
    this.user = user;
    this.checkIfVoted(user.username);
  });

  logout = action(() => {
    this.isAuthenticated = false;
    this.user = null;
    this.hasVoted = false;
  });

  checkAuth = action(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.login(user);
    }
  });

  checkIfVoted = async (username: string) => {
    try {
      const voters = await getVoters(username);
      const voter = voters.find(voter => voter.username === username);
      runInAction(() => {
        this.hasVoted = voter ? voter.glosowal === 1 : false;
      });
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  };
}

export const authStore = new AuthStore();
