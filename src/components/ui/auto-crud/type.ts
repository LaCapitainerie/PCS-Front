type Id = string | number

export type Crud = {
  data: unknown
  list: unknown
  listItem: unknown
  hooks: unknown
}

export type CrudManifest<T extends Crud> = {
  name: string
  /**
   * CRUD API
   */
  action: {
    list: () => Promise<T['list']>
    create?: (payload: T['data']) => Promise<void>
    read: (item: T['listItem']) => Promise<T['data']>
    update: (data: T['data'], listItem: T['listItem']) => Promise<void>
    delete: (item: T['listItem']) => Promise<void>
  }
  /**
   * For List and Form
   */
  getId: (item: T['listItem']) => Id
  useHooks?: () => T['hooks']
  listToDataSource: (list: T['list']) => T['listItem'][]
  ListComponent: CrudListComponent<T>
  FormComponent: CrudFormComponent<T>
}

export type CrudFormComponent<T extends Crud> = React.FunctionComponent<{
  onSave: (data: T['data']) => void
  initialValue?: Partial<T['data']>
  loading: boolean
  mode: 'create' | 'update'
}>

export type CrudListComponent<T extends Crud> = React.FunctionComponent<{
  dataSource: T['listItem'][] | undefined
  create?: (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void
  update: (item: T['listItem'], setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void
  del: (item: T['listItem'], setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void
  isLoading: boolean
  refresh: VoidFunction
  useHooks?: () => T['hooks']
}>
