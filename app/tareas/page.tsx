"use client";

import { useState, useEffect } from "react";

type Tarea = {
  id: number;
  texto: string;
  completada: boolean;
};

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Cargar tareas desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("tareas");
    if (data) {
      setTareas(JSON.parse(data));
    }
  }, []);

  // Guardar tareas
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;

    const nueva: Tarea = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
    };

    setTareas([nueva, ...tareas]);
    setNuevaTarea("");
  };

  const toggleTarea = (id: number) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

    return (
    <main>
        <h2 style={{ marginBottom: "10px" }}>✅ Tareas</h2>

        <div style={{ display: "flex", gap: "10px" }}>
        <input
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea..."
        style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            background: "#fff",
            color: "#111", // 🔥 texto oscuro
            fontSize: "16px",
            outline: "none",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
        />

        <button
            onClick={agregarTarea}
            style={{
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
            }}
        >
            +
        </button>
        </div>

        <div style={{ marginTop: "20px" }}>
        {tareas.map((tarea) => (
            <div
            key={tarea.id}
            style={{
                background: "#ffffff",
                padding: "12px",
                borderRadius: "12px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                border: "1px solid #e5e5e5",
            }}
            >
            <span
                onClick={() => toggleTarea(tarea.id)}
                style={{
                color: "#111", // 🔥 texto oscuro
                fontSize: "16px",
                textDecoration: tarea.completada ? "line-through" : "none",
                opacity: tarea.completada ? 0.6 : 1, // 👌 efecto completado
                cursor: "pointer",
                }}
            >
                {tarea.texto}
            </span>

            <button
                onClick={() => eliminarTarea(tarea.id)}
                style={{
                background: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "5px 8px",
                cursor: "pointer",
                }}
            >
                🗑
            </button>
            </div>
        ))}
        </div>
    </main>
    );
}