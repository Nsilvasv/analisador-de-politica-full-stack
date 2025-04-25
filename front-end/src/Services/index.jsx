import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/politicas';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllPoliticas = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar políticas:', error);
    throw error;
  }
};

export const createPolitica = async (politicaData) => {
  try {
    const response = await api.post('/', politicaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar política:', error);
    throw error;
  }
};

export const getPoliticaById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar política com ID ${id}:`, error);
    throw error;
  }
};

export const analisaPolitica = async (id) => {
  try {
    const response = await api.post(`/${id}/analisa`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao analisar política com ID ${id}:`, error);
    throw error;
  }
};