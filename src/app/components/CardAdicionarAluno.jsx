import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function CardAdicionarAluno({ aluno, onClose, onAdd, onError }) {
  const [novoAluno, setNovoAluno] = useState({
    name: "",
    cpf: "",
    idade: "",
    plano: "",
    status: "",
  });

  const isEditando = !!aluno;

  useEffect(() => {
    if (aluno) setNovoAluno(aluno);
  }, [aluno]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !novoAluno.name ||
      !novoAluno.cpf ||
      !novoAluno.idade ||
      !novoAluno.plano ||
      !novoAluno.status
    ) {
      onError({ message: "Preencha todos os campos!", type: "error" });
      return;
    }

    onAdd(novoAluno);
  };

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-40">
      <div className="bg-zinc-900 p-6 rounded-xl shadow-lg w-[400px] border border-zinc-700 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        <h1 className="text-xl font-extrabold text-amber-600 mb-8">
          {isEditando ? "Editar Aluno" : "Adicionar Aluno"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={novoAluno.name}
            disabled={isEditando}
            onChange={(e) => setNovoAluno({ ...novoAluno, name: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="CPF"
            value={novoAluno.cpf}
            onChange={(e) => setNovoAluno({ ...novoAluno, cpf: e.target.value })}
            disabled={isEditando}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <input
            type="number"
            placeholder="Idade"
            value={novoAluno.idade}
            onChange={(e) => setNovoAluno({ ...novoAluno, idade: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
          />
          <select
            value={novoAluno.plano}
            onChange={(e) => setNovoAluno({ ...novoAluno, plano: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="">Selecione o plano</option>
            <option value="Mensal">Mensal</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Premium">Premium</option>
          </select>
          <select
            value={novoAluno.status}
            onChange={(e) => setNovoAluno({ ...novoAluno, status: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="">Selecione o status</option>
            <option value="Em dia">Em dia</option>
            <option value="Atrasado">Atrasado</option>
          </select>

          <button
            type="submit"
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg duration-200 cursor-pointer"
          >
            {isEditando ? "Salvar Alterações" : "Adicionar"}
          </button>
        </form>
      </div>
    </div>
  );
}
