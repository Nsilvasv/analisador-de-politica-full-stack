import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPoliticaById, analisaPolitica } from '../../Services';

const ViewPolitica = () => {
  const { id } = useParams();
  const [politica, setPolitica] = useState(null);
  const [analise, setAnalise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolitica = async () => {
      try {
        const data = await getPoliticaById(id);
        console.log('Dados recebidos da API:', data);
        setPolitica(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPolitica();
  }, [id]);

  const handleAnalise = async () => {
    if (politica && politica.id) {
      try {
        const data = await analisaPolitica(politica.id);
        console.log('Dados recebidos da análise:', data);
        setAnalise(data);
      } catch (err) {
        console.error('Erro ao analisar política:', err);
      }
    };

    if (loading) {
      return <div className="bg-gray-700 text-amber-50 py-8 flex justify-center items-center h-screen">Carregando política...</div>;
    }

    if (error) {
      return <div className="bg-gray-700 text-red-500 py-8 flex justify-center items-center h-screen">Erro ao carregar política: {error}</div>;
    }

    if (!politica) {
      return <div className="bg-gray-700 text-amber-50 py-8 flex justify-center items-center h-screen">Política não encontrada.</div>;
    }

    }

    return (
      <div className="bg-gray-700 text-amber-50 min-h-screen p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">{politica?.title}</h1>
        <p className="text-amber-100 leading-relaxed mb-8">{politica?.text}</p>
        <button onClick={handleAnalise} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
          Analisar Política
        </button>
        {analise && analise.analysis && (
          <div className="bg-gray-800 rounded-lg p-6 shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Análise da Política</h2>
            <p className="text-amber-300 leading-relaxed">{analise.analysis?.summary}</p>
          </div>
        )}
        <Link to="/" className="text-amber-50 hover:text-blue-700 mt-6">
          Voltar para a Lista
        </Link>
      </div>
    );
};

export default ViewPolitica;