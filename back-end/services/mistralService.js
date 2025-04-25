import axios from 'axios';

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'; 

async function analisa(text) {
  try {
    if (!MISTRAL_API_KEY) {
      throw new Error('A chave da API da Mistral não está configurada na variável de ambiente.');
    }

    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-small', 
        messages: [
          {
            role: 'user',
            content: `Analise a seguinte política de privacidade e traga um resumo dos principais pontos."${text}"`,
          },
        ],
        max_tokens: 500, 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Erro na resposta da API da Mistral:', response.status, response.statusText, response.data);
      throw new Error(`Erro ao comunicar com API da Mistral: ${response.statusText}`);
    }

    const analysisResult = response.data.choices[0]?.message?.content;

    if (!analysisResult) {
      throw new Error('Nenhum resultado foi retornado pela Mistral.');
    }

    const summaryRegex = /Resumo:(.*?)(?:Pontos Principais:|$)/s;
    const keyPointsRegex = /Pontos Principais:(.*)/s;

    const summaryMatch = analysisResult.match(summaryRegex);
    const keyPointsMatch = analysisResult.match(keyPointsRegex);

    const summary = summaryMatch ? summaryMatch[1]?.trim() : analysisResult.trim();
    const keyPointsRaw = keyPointsMatch ? keyPointsMatch[1]?.trim() : '';
    const keyPoints = keyPointsRaw ? keyPointsRaw.split('\n').map(point => point.trim()).filter(point => point !== '') : [];

    return { summary, keyPoints };

  } catch (error) {
    console.error('Erro ao comunicar com a Mistral API:', error);
    throw error;
  }
}

export default { analisa };