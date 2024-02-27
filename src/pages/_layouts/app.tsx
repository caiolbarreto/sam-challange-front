import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="m-auto flex min-h-screen max-w-[1600px] flex-col">
      <Header />
      <div className="flex flex-1 flex-col gap-4 px-3 py-6">
        <Outlet />
      </div>
    </div>
  )
}
