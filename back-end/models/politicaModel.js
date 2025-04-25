import pool from "../services/database.js"; 

async function create(politica) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO policies (title, text) VALUES (?, ?)',
      [politica.title, politica.text]
    );
    return { id: result.insertId, ...politica }; 
  } catch (error) {
    console.error('Erro ao criar política:', error);
    throw error;
  }
}

async function findAll() {
  try {
    const [rows] = await pool.execute('SELECT id, title, text FROM policies');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar todas as políticas:', error);
    throw error;
  }
}

async function findById(id) {
  try {
    const [rows] = await pool.execute('SELECT id, title, text FROM policies WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error(`Erro ao buscar política com ID ${id}:`, error);
    throw error;
  }
}

export default {
  create,
  findAll,
  findById,
};