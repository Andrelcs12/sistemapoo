"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CardAdicionarReserva({ initialData, onClose, onAdd, onError }) {
  const [form, setForm] = useState({
    name: "",
    activity: "",
    date: "",
    time: "",
    status: "",
  });

  // Carrega os dados quando estiver editando
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.activity || !form.date || !form.time || !form.status) {
      onError({ message: "Preencha todos os campos!", type: "error" });
      return;
    }
    onAdd(form);
  };

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-gray-200 p-8 rounded-2xl w-[380px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer"
        >
          <X size={20} />
        </button>

        <h1 className="text-xl font-extrabold text-amber-600 mb-6">
          {initialData ? "Editar Reserva" : "Adicionar Reserva"}
        </h1>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome do aluno"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none"
          />

          <input
            type="text"
            name="activity"
            value={form.activity}
            onChange={handleChange}
            placeholder="Atividade"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="cursor-pointer bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:border-amber-500 outline-none"
          >
            <option value="">Selecione o status</option>
            <option value="Reservado">Reservado</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <button
            onClick={handleSubmit}
            className="cursor-pointer mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            {initialData ? "Salvar Alterações" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
