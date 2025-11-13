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
    <div className="min-h-screen sm:px-6 lg:px-12 mt-4">
      <div className="px-12">
        <h1 className="text-amber-600 font-extrabold text-2xl sm:text-3xl text-center sm:text-left">Painel Geral</h1>
        {/* grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-6">
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
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8">
          <div className="flex flex-col w-full lg:w-1/2 bg-neutral-900 p-6 rounded-xl">
            <h1 className="text-amber-600 font-bold text-lg">Frequência Semanal</h1>
            <div className="w-full h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-3 mt-2">
              <span className="flex-1 rounded-t-lg bg-zinc-700 h-[70%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-500 h-[90%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-300 h-[50%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-800 h-[80%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-600 h-[60%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-400 h-[95%] cursor-pointer hover:scale-[102%] duration-200"></span>
              <span className="flex-1 rounded-t-lg bg-zinc-300 h-[35%] cursor-pointer hover:scale-[102%] duration-200"></span>
            </div>
            <div className="w-full flex justify-between text-gray-200 font-medium text-xs sm:text-sm mt-2 px-1">
              <span className="">Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sáb</span>
              <span className="">Dom</span>
            </div>
          </div>

          {/* prox aulas*/}
          <div className="flex flex-col w-full lg:w-1/2 bg-neutral-900 p-6 rounded-xl">
            <h1 className="text-amber-600 font-bold text-lg">Próximas Aulas</h1>

            <div className="flex flex-col">
              {[
                { nome: "Natação - Iniciante", hora: "Hoje - 16:00h", cor: "green", status: "Confirmado" },
                { nome: "Yoga - Grupo 1", hora: "Hoje - 19:00h", cor: "yellow", status: "Pendente" },
                { nome: "Luta - JiuJitsu", hora: "Hoje - 20:30h", cor: "blue", status: "Agendada" },
              ].map((aula, i) => (
                <div key={i} className="mt-6 border-b border-zinc-700 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="font-semibold text-gray-100">{aula.nome}</p>
                    <span
                      className={`w-fit sm:w-24 text-center bg-${aula.cor}-200 text-${aula.cor}-800 px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {aula.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{aula.hora}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
