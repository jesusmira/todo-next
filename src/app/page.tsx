import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

  redirect('/dashboard');
  return (
    <>
    <span className="text-4xl font-bold">Hola Mundo</span>
    </>
  );
}
