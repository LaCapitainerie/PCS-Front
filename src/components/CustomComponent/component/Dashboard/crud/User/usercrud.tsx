import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createUser, deleteUser, fetchUsers, readUser, updateUser } from './user-api'
import { userSchema, type User, type UserSummary } from './user_schem'

export const UserCrudView = createCrudView<User, UserSummary>({ username: 'empty' })({
  name: 'User',
  action: {
    list: fetchUsers,
    create: createUser,
    read: ({ id }) => readUser(id),
    update: (user, { id }) => updateUser(id, user),
    delete: ({ id }) => deleteUser(id),
  },
  getId: ({ id }) => id,
  listToDataSource: (list) => list.users,
  FormComponent: createAutoForm({ schema: userSchema }),
  ListComponent: createCrudList({
    columns: () => [
      {
        accessorKey: 'id',
        accessorFn: ({ id }) => id,
      },
      {
        accessorKey: 'username',
        accessorFn: ({ username }) => username,
      },
    ],
  }),
});