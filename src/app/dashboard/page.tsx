'use server';

import { auth } from "@/auth";

export default async function Dashboard() {
  /* Esta ruta es de prueba, la usé para probar los callbacks y roles*/
  const session = await auth();
  if (session) {
    if (session?.user?.role === "admin"){
      return <h1>admin dashboard</h1>;
    }
  }
  return <h1>Normal dashboard</h1>;
}
