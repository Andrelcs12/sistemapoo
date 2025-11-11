"use client";
import { Filter, Pencil, Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import CardAdicionarAluno from "../components/CardAdicionarAluno";
import Toast from "../components/Toast";

export default function AlunosPage() {
  const [Alunos, setAlunos] = useState ([
    { id: 1, name: "Ana Silva", cpf: "843.192.067-20", idade: 27, plano: "Mensal", status: "Em dia" },
    { id: 2, name: "Bruno Costa", cpf: "105.487.629-33", idade: 34, plano: "Trimestral", status: "Atrasado" },
    { id: 3, name: "Carla Marques", cpf: "279.864.512-08", idade: 22, plano: "Premium", status: "Em dia" },
    { id: 4, name: "Diego Lima", cpf: "901.573.244-91", idade: 41, plano: "Mensal", status: "Atrasado" },
    { id: 5, name: "Eduarda Reis", cpf: "653.118.970-75", idade: 29, plano: "Premium", status: "Em dia" },
    { id: 6, name: "Fábio Almeida", cpf: "364.907.285-40", idade: 38, plano: "Trimestral", status: "Em dia" },
    { id: 7, name: "Gabriela Torres", cpf: "740.256.893-02", idade: 25, plano: "Mensal", status: "Atrasado" },
    { id: 8, name: "Heitor Nunes", cpf: "502.634.718-66", idade: 32, plano: "Premium", status: "Em dia" },
    { id: 9, name: "Isabela Pereira", cpf: "186.479.520-14", idade: 30, plano: "Mensal", status: "Atrasado" },
    { id: 10, name: "João Oliveira", cpf: "927.351.806-57", idade: 44, plano: "Trimestral", status: "Em dia" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState (false);
  const [toast, setToast] = useState(null);
  const [alunoEditando, setAlunoEditando] = useState (null);
  const [NovoAluno, setNovoAluno] = useState ({
    name: "", cpf:"", idade:"", plano:"", status:"",
  });

  const adicionarAluno = () => {
    setAlunos([
      ...Alunos,
      { id: Alunos.length + 1, ... NovoAluno},
    ]);
    setIsModalOpen(false);
    setNovoAluno({ name: "", cpf:"", idade:"", plano:"", status:""});
  }

  const deletarAluno = (id, nome) => {
    setAlunos(Alunos.filter((aluno) => aluno.id !== id));
    setToast({
      message: `${nome} foi removido com sucesso!`,
      type: "error",
    });
  };

  return (
    <>
    {toast && (
      <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
    )}
    <div className="relative min-h-screen text-gray-200 py-4 px-16">
      <div className="w-full bg-zinc-950/80 backdrop-blur-md p-8 rounded-2xl shadow-lg shadow-amber-900/10">
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-amber-500">Alunos Cadastrados</h1>
          <div className="flex gap-4 items-center">
            <button className="px-4 py-2 rounded-lg flex gap-1 items-center cursor-pointer duration-200 hover:bg-zinc-800 bg-zinc-900 border border-zinc-700 text-sm font-medium">
              Filtrar <Filter size={16} />
            </button>
            <button onClick={() => { setNovoAluno({name: "", cpf: "", idade: "", plano: "", status: "" }); setIsModalOpen(true); setAlunoEditando(null); }}
              className="px-4 py-2 rounded-lg flex gap-1 items-center cursor-pointer duration-200 hover:bg-amber-600 bg-amber-500 text-black font-semibold text-sm">
              Adicionar Aluno <Plus size={16} />
            </button>
          </div>
        </div>

        
        <table className="min-w-full text-center mt-8 border-separate border-spacing-y-2">
          <thead className="bg-linear-to-r from-zinc-800 to-amber-900/30 text-amber-400 uppercase text-sm tracking-wide">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Nome</th>
              <th>CPF</th>
              <th>Idade</th>
              <th>Plano</th>
              <th>Status</th>
              <th className="rounded-r-lg">Ações</th>
            </tr>
          </thead>

          <tbody className="text-sm font-medium">
            {Alunos.map((item, i) => (
              <tr
                key={item.id}
                className={`${
                  i % 2 === 0 ? "bg-zinc-900/60" : "bg-zinc-900/30"
                } hover:bg-amber-900/10 transition-colors duration-200`}
              >
                <td className="px-4 py-3 rounded-l-lg">{item.name}</td>
                <td className="py-3">{item.cpf}</td>
                <td className="py-3">{item.idade}</td>
                <td className="py-3">{item.plano}</td>

                <td className="py-3 flex justify-center items-center gap-2">
                  {item.status}
                </td>

                <td className="py-3 rounded-r-lg">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => { setAlunoEditando(item); setIsModalOpen(true) }} className="px-3 py-1 rounded-full flex gap-1 items-center cursor-pointer duration-200 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs">
                      <Pencil size={14} /> Editar
                    </button>
                    <button onClick={() => deletarAluno(item.id, item.name)} className="px-3 py-1 rounded-full flex gap-1 items-center cursor-pointer duration-200 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs">
                      <Trash size={14} /> Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CardAdicionarAluno
          aluno={alunoEditando}
          onClose={() => setIsModalOpen(false)}
          onAdd={(novo) => {
            if (alunoEditando) {
              // modo edição
              setAlunos((prev) =>
                prev.map((a) => (a.id === alunoEditando.id ? { ...a, ...novo } : a))
              );
              setToast({ message: "Aluno editado com sucesso!", type: "success" });
            } else {
              // modo adição
              setAlunos([...Alunos, { id: Alunos.length + 1, ...novo }]);
              setToast({ message: `${novo.name} foi adicionado com sucesso!`, type: "success" });
            }

            setIsModalOpen(false);
            setAlunoEditando(null);
          }}
          onError={(toastData) => setToast(toastData)}
        />
      )}
    </div>
    </>
  );
}
