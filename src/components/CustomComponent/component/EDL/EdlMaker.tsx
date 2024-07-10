"use client"

import { Button } from '@/components/ui/button';
import { edl } from '@/type/edl';
import { User } from '@/type/User';
import { Check, Plus, X } from 'lucide-react';
import React, { use, useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Reservation } from '@/type/Reservation';

interface LayoutProps {
    user: User;
    idReservation: Reservation["id"];
}

const Submit = async (token: User["token"], edl: edl[], idReservation: Reservation["id"]) => {
    try {
        const response: any = await (await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/edl/${idReservation}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({"Edl": edl})
            }
        )).json();

        if (response.error) {
            console.error('Error:', response.error);
        } else {
            console.log('Success:', response);
        }

    } catch (error) {
        console.error('Error:', error);
        toast({
            title: "Erreur lors de la validation du formulaire d'état des lieux",
            description: "Veuillez réessayer plus tard",
        })
    }
}

const EDLForm: React.FC<LayoutProps> = ({ user, idReservation }: LayoutProps ) => {

    const [edl, setEDL] = React.useState<edl[]>([]);

    useEffect(() => {

        if(idReservation === "") {
            return;
        }

        const dataFetch = async () => {
            try {
                const response: any = await (await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/edl/${idReservation}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `${user?.token}`,
                        },
                    }
                )).json();                

                setEDL(response.edl ?? []);

            } catch (error) {
                console.error('Error:', error);
                toast({
                    title: "Erreur lors de la récupération des états des lieux",
                    description: "Veuillez réessayer plus tard",
                })
            }
        }

        dataFetch();
    }, [idReservation, user])

    const [newEdl, setNewEdl] = React.useState<edl>({
        idreservation: idReservation,
        remark: "",
        status: false,
        final: false
    });

    useEffect(() => {
        setNewEdl({
            ...newEdl,
            idreservation: idReservation,
        });
    }, [idReservation, newEdl])
    
    

    return (
        <div className='w-2/3'>
            { idReservation === "" ? <p>Veuillez sélectionner une réservation</p> : 
                <><Table>
                    <TableCaption>Etat des lieux</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Remarque</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {edl.map((edlitem, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{edlitem.remark}</TableCell>
                                    <TableCell>{edlitem.status ? <Check /> : <X />}</TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => {
                                            const updatedEDL = [...edl];
                                            updatedEDL.splice(index, 1);
                                            setEDL(updatedEDL);
                                        } }>
                                            <X />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow key={-1}>
                            <TableCell className="font-medium">
                                <Input type='text' onChange={(e) => {
                                    setNewEdl({
                                        ...newEdl,
                                        remark: e.target.value,
                                    });
                                } } />
                            </TableCell>
                            <TableCell>
                                <Checkbox onCheckedChange={_ => setNewEdl({
                                    ...newEdl,
                                    status: !newEdl.status,
                                })} />
                            </TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => {
                                    setEDL([...edl, newEdl]);
                                } }>
                                    <Plus />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table><Button onClick={() => {
                    Submit(user.token, edl, idReservation);
                } }>
                        Envoyer le rapport
                    </Button></>
            }
        </div>
        
    )
}

export default EDLForm;