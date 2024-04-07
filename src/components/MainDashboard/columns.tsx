"use client"

import { ColumnDef } from "@tanstack/react-table"
import { BadgeCheckIcon, BadgeXIcon, Hourglass, PackageSearchIcon } from "lucide-react"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Housing = {
  ID_Housing: string
  ID_Client: number,
  ID_Bien_Immobilier: number,
  particulier: string
  status: "pending" | "processing" | "success" | "failed"
  Type: "nettoyage" | "reparation" | "peinture" | "jardinage"
  Date: string
  Heure: string
  Duree: number
  Prix: number
}

function getStatus(status:string) {
  switch (status) {
    case "pending":
      return <Hourglass className="h-5 w-5 text-grey-500"/>
    case "processing":
      return <PackageSearchIcon className="h-5 w-5 text-grey-500"/>
    case "success":
      return <BadgeCheckIcon className="h-5 w-5 text-green-500"/>
    case "failed":
      return <BadgeXIcon className="h-5 w-5 text-red-500"/>
  }
}

export const columns: ColumnDef<Housing>[] = [
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const Status = row.getValue("status") as string;
      const formatted = getStatus(Status);
 
      return <>{formatted}</>;
    },
  },

  
  {
    accessorKey: "particulier",
    header: "Email",
  },
  {
    accessorKey: "Type",
    header: "Type",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "Heure",
    header: "Heure",
  },
  {
    accessorKey: "Duree",
    header: "Duree",
  },
  {
    accessorKey: "Prix",
    header: () => <div className="text-right">prix</div>,
    cell: ({ row }) => {
      const prix = row.getValue("Prix") as number
      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }).format(prix)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]
