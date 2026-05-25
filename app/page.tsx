"use client";

import { useState, useEffect } from "react";

type Nota = {
  id: number;
  texto: string;
};

export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [nuevaNota, setNuevaNota] = useState("");

  // Cargar notas desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("notas");
    if (data) {
      setNotas(JSON.parse(data));
    }
  }, []);

  // Guardar notas en localStorage
  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(notas));
  }, [notas]);

  const agregarNota = () => {
    if (nuevaNota.trim() === "") return;

    const nueva: Nota = {
      id: Date.now(),
      texto: nuevaNota,
    };

    setNotas([nueva, ...notas]);
    setNuevaNota("");
  };

  const eliminarNota = (id: number) => {
    setNotas(notas.filter((nota) => nota.id !== id));
  };

  return (
    <main>
      <h2 style={{ marginBottom: "10px" }}>📝 Notas</h2>

      <textarea
        placeholder="Escribe una nota..."
        value={nuevaNota}
        onChange={(e) => setNuevaNota(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          marginBottom: "10px",
          background: "#ffffff",
          color: "#111", // 🔥 texto oscuro (clave)
          fontSize: "16px",
          outline: "none",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      />

      <button
        onClick={agregarNota}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          background: "#0070f3",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Guardar Nota
      </button>

      <div style={{ marginTop: "20px" }}>
        {notas.map((nota) => (
          <div
            key={nota.id}
            style={{
              background: "#ffffff",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              border: "1px solid #e5e5e5",
            }}
          >
            <p
              style={{
                color: "#111", // 🔥 texto oscuro (CLAVE)
                fontSize: "16px",
                lineHeight: "1.4",
                margin: 0,
              }}
            >
              {nota.texto}
            </p>

            <button
              onClick={() => eliminarNota(nota.id)}
              style={{
                marginTop: "10px",
                background: "#ff4d4f",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}