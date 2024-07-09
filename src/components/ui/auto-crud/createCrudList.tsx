import { Crud, CrudListComponent } from './type'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil1Icon, TrashIcon, PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '../data-table'
import { Check, X } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../select'
import { Dispatch, SetStateAction, useState } from 'react'
import { LoadingButton } from '../loading-button'

export const createCrudList = <T extends Crud>({ columns, mode, filter, setFilter }: { columns: () => ColumnDef<T['listItem']>[], mode: "make" | "allow", filter?: {title: string; content: string[]}, setFilter?: Dispatch<SetStateAction<string>> }) => {
  const CrudListTable: CrudListComponent<T> = ({ dataSource, update, del, create }) => {

    const [loading, setLoading] = useState(false);

    const toolbar = mode === "make" ? (
      <LoadingButton loading={loading} onClick={_ => create?create(setLoading):()=>{}}>
        <PlusIcon className="w-4 h-4 mr-2" /> New
      </LoadingButton>
    ) : mode === "allow" && filter ? (
      <Select onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Selectionner un ${filter.title}`} />
          </SelectTrigger>
        <SelectContent>
            <SelectGroup>
              <SelectLabel>{filter.title}</SelectLabel>
              {filter.content.map((item, index) => (
                <SelectItem value={item} key={index}>{item}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
      </Select>
    ) : <>Rien</>

    return (
      <DataTable
        toolbar={toolbar}
        columns={[
          ...columns(),
          {
            id: 'actions',
            enableHiding: false,
            maxSize: 40,
            header: () => 'Action',
            cell: ({ row }) => {
              return (
                <>
                  {
                    mode === "make" &&
                    <>
                      <LoadingButton loading={loading} onClick={() => update(row, setLoading)} variant="ghost" size="icon">
                        <Pencil1Icon className="w-4 h-4" />
                      </LoadingButton>
                      <LoadingButton loading={loading} variant="ghost" onClick={() => del(row, setLoading)} size="icon">
                        <TrashIcon className="w-4 h-4 text-destructive" />
                      </LoadingButton>
                    </> ||
                    mode === "allow" &&
                    <>
                      <LoadingButton loading={loading} onClick={() => update(row, setLoading)} variant="ghost" size="icon">
                        <Check className="w-4 h-4" />
                      </LoadingButton>
                      <LoadingButton loading={loading} variant="ghost" onClick={() => del(row, setLoading)} size="icon">
                        <X className="w-4 h-4 text-destructive" />
                      </LoadingButton>
                    </>
                    }


                  
                </>
              )
            },
          },
        ]}
        dataSource={dataSource}
      />
    )
  }

  return CrudListTable
}
