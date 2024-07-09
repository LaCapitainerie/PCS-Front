"use client"

import { Button } from '@/components/ui/button';
import { edl, edlDTO } from '@/type/edl';
import { User } from '@/type/User';
import { Check, Plus, X } from 'lucide-react';
import React, { useEffect } from 'react';

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
import { set } from 'date-fns';

interface LayoutProps {
    user: User;
}

const Submit = async (token: User["token"], edl: edl[]) => {
    try {
        const response: edlDTO = await (await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/edl`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(edl)
            }
        )).json();

    } catch (error) {
        console.error('Error:', error);
    }
}

const EDLForm: React.FC<LayoutProps> = ({ user }: LayoutProps ) => {

    const [edl, setEDL] = React.useState<edl[]>([
        {
            idReservation: "",
            remark: "Problème de plomberie",
            status: true,
            final: true
        }
    ]);

    
    const [newEdl, setNewEdl] = React.useState<edl>({
        idReservation: "",
        remark: "",
        status: false,
        final: false
    });

    return (
        <div className='w-2/3'>
            <Table>
                <TableCaption>Etat des lieux</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Remarque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        edl.map((edlitem, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{edlitem.remark}</TableCell>
                                    <TableCell>{edlitem.status ? <Check/> : <X/>}</TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => {
                                            const updatedEDL = [...edl];
                                            updatedEDL.splice(index, 1);
                                            setEDL(updatedEDL);
                                        }}>
                                            <X/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                    <TableRow key={-1}>
                        <TableCell className="font-medium">
                            <Input type='text' onChange={
                                (e) => {
                                    setNewEdl({
                                        ...newEdl,
                                        remark: e.target.value,
                                    });
                                }
                            }/>
                        </TableCell>
                        <TableCell>
                            <Checkbox onCheckedChange={_ =>
                                setNewEdl({
                                    ...newEdl,
                                    status: !newEdl.status,
                                })
                            }/>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button onClick={() => {
                                setEDL([...edl, newEdl]);
                            }}>
                                <Plus/>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button onClick={() => {
                Submit(user.token, edl);
            }}>
                Envoyer le rapport
            </Button>
        </div>
        
    )
}

export default EDLForm;