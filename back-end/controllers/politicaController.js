import politicaModel from '../models/politicaModel.js'; 
import analisaModel from '../models/analiseModel.js'; 

async function createPolitica(req, res) {
  try {
    const politica = await politicaModel.create(req.body);
    res.status(201).json(politica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllPolitica(req, res) {
  try {
    const politicas = await politicaModel.findAll();
    res.json(politicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPoliticaById(req, res) {
  try {
    const politica = await politicaModel.findById(req.params.id);
    if (!politica) {
      return res.status(404).json({ message: 'Política não encontrada' });
    }
    res.json(politica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const analisaPolitica = async (req, res) => {
  try {
    const politicaEncontrada = await politicaModel.findById(req.params.id);

    if (!politicaEncontrada) {
      return res.status(404).json({ message: 'Política não encontrada' });
    }

    const { default: mistralService } = await import('../services/mistralService.js');

    try {
      const resultadoAnalise = await mistralService.analisa(politicaEncontrada.text);

      if (analisaModel) {
        const dadosParaSalvar = {
          summary: resultadoAnalise?.summary, 
          keyPoints: resultadoAnalise?.keyPoints, 
          policyId: politicaEncontrada.id, 
        };
        await analisaModel.create(dadosParaSalvar); 
      }

    
      res.status(200).json({ politica: politicaEncontrada, analysis: resultadoAnalise });

    } catch (erroMistral) {
      console.error('Erro ao comunicar com a Mistral:', erroMistral);
      return res.status(500).json({
        message: 'Erro ao analisar a política com a IA',
        error: erroMistral.message,
      });
    }

  } catch (erroBanco) {
    console.error('Erro ao buscar política para análise:', erroBanco);
    return res.status(500).json({ message: 'Erro ao buscar a política', error: erroBanco.message });
  }
};

export default {
  createPolitica,
  getAllPolitica,
  getPoliticaById,
  analisaPolitica,
};