"use client";
import { useState, useEffect } from "react";

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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Usuáriosaaa</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="border p-2 flex-1"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={salvar}
          className="bg-blue-500 text-white px-4 rounded"
        >
          {editando ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      <ul>
        {users.map((u) => (
          <li
            key={u.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <strong>{u.nome}</strong> — {u.email}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setNome(u.nome);
                  setEmail(u.email);
                  setEditando(u.id);
                }}
                className="text-yellow-500"
              >
                ✏️
              </button>
              <button
                onClick={() => deletar(u.id)}
                className="text-red-500"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
