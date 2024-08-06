import axios from 'axios';

const API_URL = 'http://localhost/wybory_react/api.php';

interface ApiResponse {
  success: boolean;
  message?: string;
  user?: {
    username: string;
  };
}

interface Candidate {
  id: number;
  imie: string;
  glosy: number;
}

interface Voter {
  username: string;
  glosowal: number;
}

export const login = async (data: { username: string; password: string }): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const register = async (data: { username: string; password: string }): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error('Error registering', error);
    throw error;
  }
};

export const getCandidates = async (): Promise<Candidate[]> => {
  try {
    const response = await axios.get<Candidate[]>(`${API_URL}/candidates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates', error);
    throw error;
  }
};

export const getVoters = async (username: string = ''): Promise<Voter[]> => {
  try {
    const response = await axios.get<Voter[]>(`${API_URL}/voters`, {
      params: { username },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching voters', error);
    throw error;
  }
};

export const voteForCandidate = async (candidateId: string, username: string): Promise<{ message: string }> => {
  try {
    const response = await axios.post<{ message: string }>(`${API_URL}/vote`, { candidateId, username });
    return response.data;
  } catch (error) {
    console.error('Error voting', error);
    throw error;
  }
};
