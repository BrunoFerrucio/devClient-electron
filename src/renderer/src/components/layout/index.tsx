import { Outlet } from "react-router-dom";

export function Layout() {
  return(
    <>
      <div className="flex-1 flex flex-col max-h-screen">
        <h1>Teste</h1>
        {/* Parte aonde aonde a tela vai ser renderizada */}
        <Outlet />
      </div>
    </>
  )
}