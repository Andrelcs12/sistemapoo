"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck, faBan, faClock } from "@fortawesome/free-solid-svg-icons";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editando, setEditando] = useState(null);
  

  const API = "http://127.0.0.1:5000/usuarios";


  async function carregar() {
    const res = await fetch(API);
    const data = await res.json();
    setUsers(data);
  }

  async function salvar() {
    const metodo = editando ? "PUT" : "POST";
    const url = editando ? `${API}/${editando}` : API;

    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    });
    setNome("");
    setEmail("");
    setEditando(null);
    carregar();
  }

  async function deletar(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  

  return (
    <div className="min-h-screen mt-8">
      <div className="px-12">
        <h1 className="text-amber-600 font-extrabold text-2xl">Painel Geral</h1>
        {/* grid cards */}
        <div className="grid grid-cols-4 gap-8 mt-6">
          <div className="flex flex-col bg-neutral-900 p-6 border-l-4 border-cyan-600 rounded-xl shadow-md">
            <h1 className="flex justify-between text-lg font-semibold text-gray-100 items-center">Alunos Ativos<FontAwesomeIcon icon={faUser} className="text-cyan-600"/></h1>
            <span className="font-extrabold text-2xl mt-2 text-white">60</span>
            <span className="font-medium text-sm text-gray-200">+2 novos esta semana</span>
          </div>
          <div className="flex flex-col bg-neutral-900 p-6 border-l-4 border-green-600 rounded-xl shadow-md">
            <h1 className="flex justify-between text-lg font-semibold text-gray-100 items-center">Reservas Confirmadas<FontAwesomeIcon icon={faCheck} className="text-green-600"/></h1>
            <span className="font-extrabold text-2xl mt-2 text-white">24</span>
            <span className="font-medium text-sm text-gray-200">+3 novos esta semana</span>
          </div>
          <div className="flex flex-col bg-neutral-900 p-6 border-l-4 border-yellow-500 rounded-xl shadow-md">
            <h1 className="flex justify-between text-lg font-semibold text-gray-100 items-center">Aulas Hoje<FontAwesomeIcon icon={faClock} className="text-yellow-500"/></h1>
            <span className="font-extrabold text-2xl mt-2 text-white">6</span>
            <span className="font-medium text-sm text-gray-200">+5 novos esta semana</span>
          </div>
          <div className="flex flex-col bg-neutral-900 p-6 border-l-4 border-red-500 rounded-xl shadow-md">
            <h1 className="flex justify-between text-lg font-semibold text-gray-100 items-center">Cancelamentos<FontAwesomeIcon icon={faBan} className="text-red-500"/></h1>
            <span className="font-extrabold text-2xl mt-2 text-white">4</span>
            <span className="font-medium text-sm text-gray-200">nas últimas 24h</span>
          </div>
        </div>
        
        {/* frequencia */}
        <div className="flex gap-8">
          <div className="flex flex-col w-[49%] bg-neutral-900 p-6 rounded-xl mt-8">
            <h1 className="text-amber-600 font-bold text-lg">Frequência Semanal</h1>
            <div className="w-full h-64 flex items-end justify-between gap-3 mt-2">
              <span className="flex-1 rounded-t-lg bg-zinc-700 h-[70%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-500 h-[90%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-300 h-[50%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-800 h-[80%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-600 h-[60%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-400 h-[95%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-300 h-[35%] cursor-pointer hover:scale-[102%] duration-200"></span>
            </div>
            <div className="w-full justify-between flex gap-4 items-center text-gray-200 font-medium text-sm mt-1">
              <span className="ml-5">Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sáb</span>
              <span className="mr-5">Dom</span>
            </div>
          </div>

          {/* prox aulas*/}
          <div className="flex flex-col w-[49%] bg-neutral-900 p-6 rounded-xl mt-8">
            <h1 className="text-amber-600 font-bold text-lg">Próximas Aulas</h1>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mt-8">
                <p className="font-semibold">Natação - Inciante</p>
                <span className="w-20 text-center bg-green-200 px-2 py-1 rounded-full text-xs font-medium text-green-800">Confirmado</span>
              </div>
              <p className="text-sm text-gray-300 border-b-2  border-gray-400 pb-2">Hoje - 16:00h</p>

              <div className="flex items-center justify-between mt-8">
                <p className="font-semibold">Yoga - Grupo 1</p>
                <span className="w-20 text-center bg-yellow-200 px-2 py-1 rounded-full text-xs font-medium text-yellow-800">Pendente</span>
              </div>
              <p className="text-sm text-gray-300 border-b-2  border-gray-400 pb-2">Hoje - 19:00h</p>

              <div className="flex items-center justify-between mt-8">
                <p className="font-semibold">Luta - JiuJitsu</p>
                <span className="w-20 text-center bg-blue-200 px-2 py-1 rounded-full text-xs font-medium text-blue-800">Agendada</span>
              </div>
              <p className="text-sm text-gray-300 border-b-2 border-gray-400 pb-2">Hoje - 20:30h</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
