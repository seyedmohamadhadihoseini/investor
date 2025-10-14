"use client"
import { useEffect, useState } from "react";
import PersonDataTable from "./PersonDataTable";
import { BankAccount, Contract, Person } from "@prisma/client";
import { GetAllPeople } from "@/server";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const [people, setPeople] = useState<(Person & { referrers: Person[] } & { investments: Contract[] } & { bankAccounts: BankAccount[] })[]>([]);
  const ForceUpdate = useSelector((state: RootState) => state.panel.ForceUpdate);
  useEffect(() => {
    GetAllPeople().then(setPeople);
  }, [ForceUpdate])
  return (
    <PersonDataTable people={people} />
  );
}