"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CardAdicionarReserva({ initialData, onClose, onAdd, onError }) {
  const [reserva, setReserva] = useState({
    name: "",
    activity: "",
    date: "",
    time: "",
    status: "",
  });

  const isEditando = !!initialData?.id;

  useEffect(() => {
    if (initialData) setReserva(initialData);
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, activity, date, time, status } = reserva;
    if (!name || !activity || !date || !time || !status) {
      onError({ message: "Preencha todos os campos!", type: "error" });
      return;
    }

    onAdd(reserva);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 flex items-center justify-center z-40"
      >
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-zinc-900 p-6 rounded-xl shadow-lg w-[400px] border border-zinc-700 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={20} />
          </button>

          <h1 className="text-xl font-extrabold text-amber-600 mb-8">
            {isEditando ? "Editar Reserva" : "Adicionar Reserva"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome do Aluno"
              value={reserva.name}
              onChange={(e) => setReserva({ ...reserva, name: e.target.value })}
              disabled={isEditando}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />

            <input
              type="date"
              value={reserva.date}
              onChange={(e) => setReserva({ ...reserva, date: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />

            <input
              type="time"
              value={reserva.time}
              onChange={(e) => setReserva({ ...reserva, time: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />

            <select
              value={reserva.activity}
              onChange={(e) => setReserva({ ...reserva, activity: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="">Selecione o tipo de aula</option>
              <option value="Musculação">Musculação</option>
              <option value="Yoga">Yoga</option>
              <option value="Pilates">Pilates</option>
              <option value="Luta">Luta</option>
              <option value="Crossfit">Crossfit</option>
              <option value="Spinning">Spinning</option>
              <option value="Natação">Natação</option>
            </select>

            <select
              value={reserva.status}
              onChange={(e) => setReserva({ ...reserva, status: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="">Selecione o status</option>
              <option value="Reservado">Reservado</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>

            <button
              type="submit"
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg duration-200 cursor-pointer"
            >
              {isEditando ? "Salvar Alterações" : "Adicionar"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
