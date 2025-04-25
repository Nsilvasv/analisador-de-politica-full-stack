import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPolitica } from '../../Services';

const CreatePolitica = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPolitica({ title, text });
      navigate('/'); 
    } catch (error) {
      console.error('Erro ao criar política:', error);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen flex flex-col justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-4 bg-white p-6 rounded-md shadow-md overflow-auto"
      >
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Título:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
            Política:
          </label>
          <textarea
            id="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 overflow-auto"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Insira sua política aqui"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-900 text-amber-50 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Salvar Política
        </button>
      </form>
    </div>
  );

};

export default CreatePolitica;