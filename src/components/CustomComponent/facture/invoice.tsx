"use client"

// Create and Download PDF file
import { Command } from "@/type/Command";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const generatePDF = ({ commande }: { commande?: Command }) => {

  const command = commande || {
    "ID": "379b3b7b-1b3b-4b3b-8b3b-3b3b3b3b3b3b",
    "ID_client": "3",
    "ID_property": "55ba9865-53d0-4b1b-bc64-580e313c7149",
    "Date": "2024-05-05",
    "Duree": 2,
    "Shipping_info": "1 rue de la paix, 75000 Paris",
    "Products": "Peinture",
    "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies ultricies, nunc nunc.",
    "TJM": 50,
    "Status": "En cours",
    "Fait_le": "2024-05-05"
  } as Command;


  const timeStamp = new Date().toISOString();

  const doc = new jsPDF();

  // Set font size
  doc.setFontSize(12);

  // Add content to this pdf document
  doc.text("Invoice", 10, 10);
  doc.text(`Company Name: Paris Caretaker Services`, 10, 20);
  doc.text(`Invoice Number: ${command.ID}`, 10, 30);

  // Create a Table for Invoice Items

  // Define columns
  const columns = [
    "Service",
    "Description",
    "Quantity",
    "Price",
    "Total",
  ];

  // Define rows
  const rows = [
    [
      command.Products,
      command.Description,
      1,
      command.TJM,
      command.TJM
    ],
    [
      "Duration",
      "Duration of the service",
      command.Duree,
      command.TJM,
      command.Duree * command.TJM
    ],
    [
      "Tax",
      "20% VAT",
      "",
      "",
      command.TJM * command.Duree * 0.2
    ],
    [
      "Total",
      "",
      "",
      "",
      command.TJM * command.Duree * 1.2
    ]
  ]

  // Create the table using jspdf-autotable


  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 70,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellWidth: "wrap",
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 40 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 30 },
    },
    margin: { left: 10, right: 10 },
  });

  doc.save(`${command.ID}.pdf`);
};