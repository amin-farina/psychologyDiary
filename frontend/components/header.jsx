'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"
import Head from 'next/head';

export function NavBar() {
  const pathname = usePathname();
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Obtener Turno', href: '/turno' },
    { name: 'Historial', href: '/historial' },

  ]

  return (
    <div className='w-100 flex py-5'>
      <div className="flex w-1/2 justify-start ps-5">
        <h1>Navbar</h1>
      </div>
      <div className="flex w-1/2 justify-end pe-5 space-x-5">
        {links.map((element) => {
          const isActive = pathname === (element.href);
          return (
            <li key={element.name} className='list-none 	'>
              <Link href={element.href} className={`${isActive ? 'text-black bg-white' : ''} p-1 font-bold rounded`}>
                {element.name}
              </Link>
            </li>
          );
        })}
      </div>
    </div>
  )
}
