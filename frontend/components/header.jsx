'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"
import { useClientContext } from '@/context/ClientContext';
import Logout from './login/logout';
import { useEffect, useState } from 'react';

export function NavBar() {
  const pathname = usePathname();
  const { userLogged, userLoggedRole, setUserLogged } = useClientContext()
  const links = [
    { name: 'Inicio', href: '/' },
    { name: 'Contacto', href: '/contacto' },
    // { name: 'Obtener Turno', href: '/turno' },
    // { name: 'Historial', href: '/historial' },
    // { name: 'Clientes', href: '/clientes' },
  ]
  const [linksPage, setLinksPage] = useState(links)

  const linkUsuario = [
    { name: "Inicio", href: "/usuario" },
    { name: "Perfil", href: "/usuario/perfil" },
    { name: "Clientes", href: "/usuario/clientes" },
    { name: "Turnos", href: "/usuario/turnos" }
  ]

  const linkAdmin = [
    { name: "Inicio", href: "/admin" },
    { name: "Clientes", href: "/admin/clientes" },
    { name: "Usuarios", href: "/admin/usuarios" },
    { name: "Turnos", href: "/admin/turnos" },
    { name: "Bandeja", href: "/admin/bandeja" }
  ]


  useEffect(() => {
    console.log("Role:", userLoggedRole)
    if (userLoggedRole === "usuario") {
      setLinksPage(linkUsuario)
    }
    if (userLoggedRole === "admin") {
      setLinksPage(linkAdmin)
    }

  }, [userLoggedRole])

  const handleLogout = (e) => {
    e.preventDefault();
    setLinksPage(links)
    localStorage.removeItem("token")
    setUserLogged("")

  }

  return (
    <div className='w-100 flex py-5'>
      <div className="flex w-1/2 justify-start ps-5">
        <h1>Navbar</h1>
      </div>
      <div className="flex w-1/2 justify-end pe-5 space-x-5">
        {linksPage.map((element) => {
          const isActive = pathname === (element.href);
          return (
            <li key={element.name} className='list-none flex items-center	'>
              <Link href={element.href} className={`${isActive ? 'text-black bg-white' : ''} p-1 font-bold rounded`}>
                {element.name}
              </Link>
            </li>
          );
        })}
        {userLogged ? (
          <l1 className='list-none flex space-x-2 items-center'>
            <h1>{userLogged}</h1>
            <button onClick={(e) => handleLogout(e)} className='bg-red-700 px-2 py-1 rounded'>Salir</button>
          </l1>
        ) : (<li className='list-none flex items-center'>
          <Link href="/login" className={` p-1 font-bold rounded`}>
            Login
          </Link>
        </li>)}


      </div>
    </div>
  )
}
