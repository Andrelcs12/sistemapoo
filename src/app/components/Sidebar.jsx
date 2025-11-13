"use client";
import { useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaCalendarCheck,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800/50 text-white transition-all duration-300 flex flex-col justify-between ${
          isOpen ? "w-48" : "w-16"
        }`}
      >
        {/* Seção de cima */}
        <div>
          {/* Botão de abrir/fechar */}
          <button
            className={`p-4 focus:outline-none w-full hover:bg-amber-600 duration-200 flex cursor-pointer transition-all ${
              isOpen ? "justify-start" : "justify-center"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars className="text-xl" />
          </button>

          {/* Menu principal */}
          <nav className="mt-4 flex flex-col space-y-2">
            <a
              href="/"
              className={`flex items-center gap-3 px-4 py-2 hover:bg-amber-600 rounded-xs duration-200 transition-all ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <FaHome className="text-xl" />
              {isOpen && <span>Início</span>}
            </a>

            <a
              href="/alunos"
              className={`flex items-center gap-3 px-4 py-2 hover:bg-amber-600 rounded-xs duration-200 transition-all ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <FaUserFriends className="text-xl" />
              {isOpen && <span>Alunos</span>}
            </a>

            <a
              href="/reservas"
              className={`flex items-center gap-3 px-4 py-2 hover:bg-amber-600 rounded-xs duration-200 transition-all ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <FaCalendarCheck className="text-xl" />
              {isOpen && <span>Reservas</span>}
            </a>
          </nav>
        </div>

        {/* Seção inferior (botão de sair) */}
        <div className="mb-4">
          <a
            href="/"
            className={`flex items-center gap-3 px-4 py-2 hover:bg-amber-600 rounded-xs duration-200 ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaSignOutAlt className="text-xl" />
            {isOpen && <span>Sair</span>}
          </a>
        </div>
      </div>

      {/* Espaço dinâmico para o conteúdo */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "ml-32" : "ml-4"
        }`}
      ></div>
    </>
  );
}
