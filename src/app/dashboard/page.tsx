
import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function DashboardPage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }


  return (
    <div className="grid grid-cols-1 gap-6 ">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col gap-2">
          <span>Nombre: { session.user?.name }</span>
          <span>Email: { session.user?.email }</span>
          <span>Imagen: { session.user?.image }</span>
          <div>
            { JSON.stringify(session) }
          </div>
        </div>
      </WidgetItem>
      </div> 
  );
}