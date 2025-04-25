import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPoliticas } from "../../Services";

const Home = () => {
    const [politicas, setPoliticas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const buscarPoliticas = async () => {
          try {
            const dados = await getAllPoliticas();
            setPoliticas(dados);
            setCarregando(false);
          } catch (err) {
            setErro(err.message);
            setCarregando(false);
          }
        };

        buscarPoliticas();
      }, []);

    return (
        <div className="bg-gray-700 min-h-screen flex flex-col items-center p-4 overflow-y-auto">
            <div className="mb-8 text-center">
                <h1 className=" text-4xl md:text-6xl text-amber-50 mb-2">Bem-vindo ao Analisador de Políticas</h1>
            </div>

            <div className="w-full max-w-7xl">
                <h2 className="text-2xl text-amber-50 mb-4">Políticas criadas</h2>

                {carregando && <div className="text-amber-50">Carregando políticas...</div>}
                {erro && <div className="text-red-500">Erro ao carregar políticas: {erro}</div>}

                {!carregando && !erro && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {politicas.map(politica => (
                            <div key={politica.id} className="bg-gray-800 border border-amber-700 rounded-lg p-4 flex flex-col justify-between">
                                <h3 className="text-xl text-amber-50 mb-2">{politica.title}</h3>
                                <Link to={`/politicas/${politica.id}`} className="text-amber-300 hover:text-amber-500 text-sm mt-2">
                                    Veja mais...
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link to="/criar-politica" className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Criar Nova Política
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;