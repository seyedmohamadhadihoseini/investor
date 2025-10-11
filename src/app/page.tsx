

import prisma from "@/services/prisma";
import PersonDataTable from "./PersonDataTable";




export default async function Home() {

  const people = await prisma.person.findMany({ include: { investments: true ,referrers:true} });
  return (
    <PersonDataTable people={people} />
  );
}
