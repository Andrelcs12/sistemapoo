"use client";
import { Filter, Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import Toast from "../components/Toast";
import CardAdicionarReserva from "../components/CardAdicionarReserva";

export default function ReservasPage() {
  const [Reservas, setReservas] = useState ([
    { id: 1, name: "Ana Silva", activity: "Musculação", date: "2025-11-01", time: "07:00", status: "Confirmado" },
    { id: 2, name: "Bruno Costa", activity: "Spinning", date: "2025-11-02", time: "18:30", status: "Reservado" },
    { id: 3, name: "Carla Marques", activity: "Natação", date: "2025-11-03", time: "12:00", status: "Concluído" },
    { id: 4, name: "Diego Lima", activity: "Musculação", date: "2025-11-03", time: "19:00", status: "Cancelado" },
    { id: 5, name: "Eduarda Reis", activity: "Pilates", date: "2025-11-04", time: "09:30", status: "Confirmado" },
    { id: 6, name: "Fábio Almeida", activity: "Crossfit", date: "2025-11-05", time: "06:00", status: "Reservado" },
    { id: 7, name: "Gabriela Torres", activity: "Spinning", date: "2025-11-05", time: "20:00", status: "Confirmado" },
    { id: 8, name: "Heitor Nunes", activity: "Natação", date: "2025-11-06", time: "13:00", status: "Reservado" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState (false);
  const [toast, setToast] = useState(null);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [novaReserva, setNovaReserva] = useState ({
    name: "", activity:"", date:"", time:"", status:"",
  })

  const abrirAdicionar = () => {
    setReservaEditando(null);
    setNovaReserva({ name: "", activity: "", date: "", time: "", status: "" });
    setIsModalOpen(true);
  };
  
  const abrirEditar = (item) => {
    setReservaEditando(item);
    setNovaReserva({ ...item });
    setIsModalOpen(true);
  };

  const salvarReserva = (dados) => {
    if (reservaEditando) {

      setReservas((prev) => prev.map((r) => (r.id === reservaEditando.id ? { ...r, ...dados } : r)));
      setToast({ message: "Reserva editada com sucesso!", type: "success" });
    } else {
   
      const novo = { id: Date.now(), ...dados };
      setReservas((prev) => [...prev, novo]);
      setToast({ message: `${dados.name} foi adicionado com sucesso!`, type: "success" });
    }
    setIsModalOpen(false);
    setReservaEditando(null);
  };

  const deletarReserva = (id, nome) => {
    setReservas((prev) => prev.filter((r) => r.id !== id));
    setToast({ message: `${nome} foi removido com sucesso!`, type: "error" });
  };

  return (
    <>
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    <div className="relative min-h-screen text-gray-200 py-4 px-16">
      <div className="w-full bg-zinc-950/80 p-8 rounded-2xl shadow-lg shadow-amber-900/10">
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-amber-500">Reservas Feitas</h1>
          <div className="flex gap-4 items-center">
            <button className="px-4 py-2 rounded-lg flex gap-1 items-center cursor-pointer duration-200 hover:bg-zinc-800 bg-zinc-900 border border-zinc-700 text-sm font-medium">
              Filtrar <Filter size={16} />
            </button>
            <button onClick={() => { setNovaReserva({name: "", activity:"", date:"", time:"", status:""}); abrirAdicionar() }} className="px-4 py-2 rounded-lg flex gap-1 items-center cursor-pointer duration-200 hover:bg-amber-600 bg-amber-500 text-black font-semibold text-sm">
              Adicionar Reserva <Plus size={16} />
            </button>
          </div>
        </div>

        
        <table className="min-w-full text-center mt-8 border-separate border-spacing-y-2">
          <thead className="bg-linear-to-r from-zinc-800 to-amber-900/30 text-amber-400 uppercase text-sm tracking-wide">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Nome</th>
              <th>Atividade</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Status</th>
              <th className="rounded-r-lg">Ações</th>
            </tr>
          </thead>

          <tbody className="text-sm font-medium">
            {Reservas.map((item, i) => (
              <tr
                key={item.id}
                className={`${
                  i % 2 === 0 ? "bg-zinc-900/60" : "bg-zinc-900/30"
                } hover:bg-amber-900/10 transition-colors duration-200`}
              >
                <td className="px-4 py-3 rounded-l-lg">{item.name}</td>
                <td className="py-3">{item.activity}</td>
                <td className="py-3">{item.date}</td>
                <td className="py-3">{item.time}</td>

                <td className="py-3 flex justify-center items-center gap-2">
                  {item.status}
                </td>

                <td className="py-3 rounded-r-lg">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => abrirEditar(item)} className="px-3 py-1 rounded-full flex gap-1 items-center cursor-pointer duration-200 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs">
                      <Pencil size={14} /> Editar
                    </button>
                    <button onClick={() => deletarReserva(item.id, item.name)} className="px-3 py-1 rounded-full flex gap-1 items-center cursor-pointer duration-200 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs">
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
        <CardAdicionarReserva
          initialData={novaReserva}
          onClose={() => { setIsModalOpen(false); setReservaEditando(null); }}
          onAdd={salvarReserva}
          onError={(toastData) => setToast(toastData)}
        />
      )}
    </div>
    </>
  );
}
