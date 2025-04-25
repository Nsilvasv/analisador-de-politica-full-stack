import pool from '../services/database.js';

async function create(analise) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO analyses (summary, keyPoints, policyId) VALUES (?, ?, ?)',
      [analise.summary, JSON.stringify(analise.keyPoints), analise.policyId]
    );
    return { id: result.insertId, ...analise };
  } catch (error) {
    console.error('Erro ao criar análise:', error);
    throw error;
  }
}

async function findByPoliticasId(policyId) {
  try {
    const [rows] = await pool.execute('SELECT id, summary, keyPoints FROM analyses WHERE policyId = ?', [policyId]);
    return rows;
  } catch (error) {
    console.error(`Erro ao buscar análises para a política com ID ${policyId}:`, error);
    throw error;
  }
}

export default { create, findByPoliticasId };