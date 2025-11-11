"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex justify-between items-center px-24 py-4">
        <h1 className="text-3xl text-cyan-700 font-extrabold">Academia</h1>
        <nav>
          <ul className="flex items-center gap-12">
            <li>
              <Link
                href="/"
                className="text-gray-700 font-semibold hover:text-cyan-600 hover:underline"
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                href="/alunos"
                className="text-gray-700 font-semibold hover:text-cyan-600 hover:underline"
              >
                Alunos
              </Link>
            </li>
            <li>
              <Link
                href="/reservas"
                className="text-gray-700 font-semibold hover:text-cyan-600 hover:underline"
              >
                Reservas
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
}