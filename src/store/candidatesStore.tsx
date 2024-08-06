import { makeAutoObservable, runInAction } from 'mobx';
import { getCandidates, getVoters } from '../apiService';

interface Candidate {
  id: number;
  imie: string;
  glosy: number;
}

interface Voter {
  username: string;
  glosowal: number;
}

class CandidatesStore {
  candidates: Candidate[] = [];
  voters: Voter[] = [];
  selectedCandidate: number | null = null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed' = 'idle';
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCandidates = async () => {
    this.status = 'loading';
    try {
      const candidates = await getCandidates();
      runInAction(() => {
        this.candidates = candidates;
        this.status = 'succeeded';
      });
    } catch (error) {
      runInAction(() => {
        this.status = 'failed';
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = 'Unknown error';
        }
      });
    }
  }

  fetchVoters = async () => {
    try {
      const voters = await getVoters();
      runInAction(() => {
        this.voters = voters;
      });
    } catch (error) {
      console.error('Error fetching voters:', error);
    }
  }

  fetchCandidatesAndVoters = async () => {
    this.status = 'loading';
    try {
      const [candidates, voters] = await Promise.all([getCandidates(), getVoters()]);
      runInAction(() => {
        this.candidates = candidates;
        this.voters = voters;
        this.status = 'succeeded';
      });
    } catch (error) {
      runInAction(() => {
        this.status = 'failed';
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = 'Unknown error';
        }
      });
    }
  }

  setSelectedCandidate = (id: number) => {
    this.selectedCandidate = id;
  }

  updateVotes = (candidateId: number) => {
    const candidate = this.candidates.find(c => c.id === candidateId);
    if (candidate) {
      candidate.glosy += 1; // Zakładamy, że głosy są zwiększane o 1
    }
  }
}

export const candidatesStore = new CandidatesStore();
