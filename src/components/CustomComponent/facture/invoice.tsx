"use client"

// Create and Download PDF file
import { Command } from "@/type/Command";
import { User } from "@/type/User";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable, { RowInput } from "jspdf-autotable";

export const PDF_invoice = ({ commande, client }: { commande?: Command, client?: User }) => {

  const command = commande || {
    "id": "379b3b7b-1b3b-4b3b-8b3b-3b3b3b3b3b3b",
    "idclient": "3",
    "idproperty": "55ba9865-53d0-4b1b-bc64-580e313c7149",
    "date": "2024-05-05",
    "duree": 2,
    "shippinginfo": "1 rue de la paix, 75000 Paris",
    "products": "Peinture",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies ultricies, nunc nunc.",
    "tjm": 50,
    "status": "pending",
    "done": "2024-05-05"
  } as Command;

  const clientInfo = client || {
    "id": "3",
    "type": "traveler",
    "mail": "mail@email.com",
    "password": "password",
    "registerdate": "2024-05-05",
    "lastConnectionDate": "2024-05-05",
    "avatar": "https://media.discordapp.net/attachments/597782659430613002/1236698906780237874/image.png?ex=6638f51c&is=6637a39c&hm=a39eed4843b9fe556efc2817bd7403b711b09a3f3303311acf7c64cc23017da5&=&format=webp&quality=lossless&width=671&height=671",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies ultricies, nunc nunc.",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "0123456789",
    "token": "token"
  } as User;

  const doc = new jsPDF();

  // Set font size
  doc.setFontSize(48);
  doc.setTextColor("#064E68")
  doc.setFont("helvetica", 'bold');

  // Add content to this pdf document
  doc.text("FACTURE", 10, 30, {});

  
  doc.setFontSize(12);
  doc.setTextColor("#000000")
  doc.text(`Paris Caretaker Services`, 10, 40);
  doc.setFont("helvetica", 'normal');
  doc.text(`1 rue de la paix`, 10, 45);
  doc.text(`75000 Paris`, 10, 50);

  doc.setFont("helvetica", 'bold');
  doc.text(`FACTURE POUR`, 10, 60);
  doc.setFont("helvetica", 'normal');
  doc.text(`${clientInfo.lastName} ${clientInfo.firstName}`, 10, 65);
  doc.text(`${command.shippinginfo.split(", ")[0]}`, 10, 70);
  doc.text(`${command.shippinginfo.split(", ")[1]}`, 10, 75);


  doc.setFont("helvetica", 'bold');
  doc.text(`FACTURE N°`, 140, 60);
  doc.setFont("helvetica", 'normal');
  doc.text(`${command.id.split("-")[0]}`, 180, 60);
  doc.setFont("helvetica", 'bold');
  doc.text(`DATE `, 140, 65);
  doc.setFont("helvetica", 'normal');

  const d = (date: string) => (new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(date))).split(" ")[0];

  doc.text(`${d(command.date)}`, 180, 65);
  doc.setFont("helvetica", 'bold');
  doc.text(`DATE PRÉVUE `, 140, 70);
  doc.setFont("helvetica", 'normal');
  doc.text(`${d(command.done)}`, 180, 70);


  doc.addImage(process.env.NEXT_PUBLIC_BIG_ICON_URL, "PNG", 160, 0, 50, 50);

  let ancor = 60;
  doc.addImage("https://i.imgur.com/j6Fvhj2.png", "PNG", ancor, 250, 60, 25);
  
  doc.setTextColor("#064E68")
  doc.setFont("helvetica", 'bold');
  doc.text(`TERMES`, ancor+65, 257);
  doc.setFont("helvetica", 'normal');
  doc.setTextColor("#000000")
  doc.setFontSize(8);
  doc.text(`Le paiement doit se faire dans les 15 prochains jour`, ancor+65, 262);
  doc.text(`Un paiement en retard sera accompagné de 5% frais ajoutées`, ancor+65, 267);
  doc.text(`Contactez nous pour les réclamations`, ancor+65, 272);



  // Create a Table for Invoice Items

  // Define columns
  const columns = [
    "Service",
    "Description",
    "Durée",
    "Prix unitaire",
    "Total",
  ];

  // Define rows
  const rows = [
    [
      command.products,
      command.description,
      command.duree,
      {content: command.tjm, styles: { halign: 'right' } },
      {content: command.tjm * command.duree, styles: { halign: 'right' } }
    ],
    [
      {content: "Taxes"},
      {content: "20% TVA"},
      {content: ""},
      {content: ""},
      {content: command.tjm * command.duree * .2, styles: { halign: 'right' } }
    ],
    [
      {content: "Total"},
      {content: ""},
      {content: ""},
      {content: ""},
      {content: command.tjm * command.duree * 1.2, styles: { halign: 'right' } }
    ]
  ] satisfies RowInput[]

  // Create the table using jspdf-autotable


  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 90,
    theme: "striped",
    styles: {
      fontSize: 10,
      cellWidth: "wrap",
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 70 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
    },
    margin: { left: 10, right: 10 },
  });

  ancor = 100 + rows.length * 10 + 10;
  
  doc.setFontSize(16);
  doc.setTextColor("#064E68")
  doc.setFont("helvetica", 'bold');
  doc.text('TOTAL', 155, ancor);

  doc.setTextColor("#000000")
  doc.text(`${command.tjm * command.duree * 1.2} €`, 185, ancor);


  doc.save(`Facture de ${command.products} du ${command.date} n°${command.id.split("-")[0]}.pdf`);
};