"use client"

// Create and Download PDF file
import { Command } from "@/type/Command";
import { User } from "@/type/User";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const generatePDF = ({ commande, client }: { commande?: Command, client?: User }) => {

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

  const clientInfo = client || {
    "ID": "3",
    "Username": "Host Domain",
    "Nom": "Host",
    "Prenom": "Domain",
    "Email": "domain.host@email.com",
    "Type": "Locataire",
    "Avatar": "https://randomuser.me/api/portraits",
    "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies ultricies, nunc nunc.",
    "Joined": "2019-01-01",
    "Phone": "06879797110"
  } as User;


  const timeStamp = new Date().toISOString();

  const doc = new jsPDF();

  doc.addFont('Arial', 'Arial', 'normal');
  doc.setFont('Arial')

  // Set font size
  doc.setFontSize(48);
  doc.setTextColor("#064E68")
  doc.setFont("helvetica", 'bold');

  // Add content to this pdf document
  doc.text("INVOICE", 10, 30, {});

  
  doc.setFontSize(12);
  doc.setTextColor("#000000")
  doc.text(`Paris Caretaker Services`, 10, 40);
  doc.setFont("helvetica", 'normal');
  doc.text(`1 rue de la paix`, 10, 45);
  doc.text(`75000 Paris`, 10, 50);

  doc.setFont("helvetica", 'bold');
  doc.text(`INVOICE TO`, 10, 60);
  doc.setFont("helvetica", 'normal');
  doc.text(`${clientInfo.Nom} ${clientInfo.Prenom}`, 10, 65);
  doc.text(`${command.Shipping_info.split(", ")[0]}`, 10, 70);
  doc.text(`${command.Shipping_info.split(", ")[1]}`, 10, 75);


  doc.setFont("helvetica", 'bold');
  doc.text(`INVOICE N°`, 150, 60);
  doc.setFont("helvetica", 'normal');
  doc.text(`${command.ID.split("-")[0]}`, 180, 60);
  doc.setFont("helvetica", 'bold');
  doc.text(`DATE `, 150, 65);
  doc.setFont("helvetica", 'normal');
  doc.text(`${command.Date}`, 180, 65);
  doc.setFont("helvetica", 'bold');
  doc.text(`DUE DATE `, 150, 70);
  doc.setFont("helvetica", 'normal');
  doc.text(`${command.Fait_le}`, 180, 70);


  doc.addImage("https://media.discordapp.net/attachments/597782659430613002/1236698906780237874/image.png?ex=6638f51c&is=6637a39c&hm=a39eed4843b9fe556efc2817bd7403b711b09a3f3303311acf7c64cc23017da5&=&format=webp&quality=lossless&width=671&height=671", "WEBP", 160, 0, 50, 50);

  let ancor = 60;
  doc.addImage("https://media.discordapp.net/attachments/597782659430613002/1236706957478592522/image.png?ex=6638fc9b&is=6637ab1b&hm=b54ee47ac62fdd67dcee7ffdf79da45464918fd3a5c42d6a1b3a410df8eefdb4&=&format=webp&quality=lossless", "WEBP", ancor, 250, 60, 25);
  
  doc.setTextColor("#064E68")
  doc.setFont("helvetica", 'bold');
  doc.text(`TERMS`, ancor+65, 257);
  doc.setFont("helvetica", 'normal');
  doc.setTextColor("#000000")
  doc.text(`Payment is due within 15 days`, ancor+65, 262);
  doc.text(`Late payment is subject to fees of 5%`, ancor+65, 267);
  doc.text(`Please contact us for any inquiries`, ancor+65, 272);



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
  doc.text('TOTAL', 142, ancor);

  doc.setTextColor("#000000")
  doc.text(`${command.TJM * command.Duree * 1.2} €`, 172, ancor);


  doc.save(`Facture de ${command.Products} du ${command.Date} n°${command.ID.split("-")[0]}.pdf`);
};