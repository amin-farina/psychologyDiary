"use client"

import { useState } from "react"

export function MessageBeta() {
    const [status, setStatus] = useState(true)

    const handleClose = () => {
        setStatus(false);
    };
    return (
        status && (
            <div className="fixed bottom-0 left-0 w-full bg-purple-800  p-2">
                <div className="flex justify-center items-center  ">
                    <h1>Esta aplicación se encuentra en una fase de prueba (BETA). Se
                        podrían experimentar cambios y mejoras. Gracias por su comprensión.  </h1>
                    <button className="bg-white px-4 text-black py-1 hover:bg-purple-900 hover:border-white hover:text-white hover:border rounded mx-3" onClick={handleClose}>Aceptar y Cerrar</button>
                </div>
            </div>
        )
    )
};
