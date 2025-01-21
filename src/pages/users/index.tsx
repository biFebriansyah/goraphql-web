import { useState, ChangeEvent } from 'react';
import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { UsersDetail, Users as UserType } from '@utils/constant';
import { gql, useQuery, useMutation } from 'urql';
import { useSetRecoilState } from 'recoil';
import { setToken } from '@utils/recoilState';
import PerfectScrollbar from 'react-perfect-scrollbar';
import withAuth from '@utils/withAuth';
import moment from 'moment';
import UserCreate from './create';

const UserQuery = gql`
  query ($page: Int!, $limit: Int!, $name: String) {
    users(page: $page, limit: $limit, name: $name) {
      data {
        _id
        name
        email
        password
        admin
        created_at
      }
      meta {
        total
        prev
        next
      }
    }
  }
`;

const UserDeleteMutation = gql`
  mutation ($_id: String!) {
    deleteUser(_id: $_id)
  }
`;

function Users() {
  const [searchName, setSearchName] = useState<string | null>(null);
  const [pages, setPages] = useState<number>(1);
  const [updateData, setUpdateData] = useState<UserType | null>(null);
  const [open, setOpen] = useState(false);

  const setTokens = useSetRecoilState(setToken);
  const [deleteResult, deleteUser] = useMutation(UserDeleteMutation);
  const [result, reexecuteQuery] = useQuery({
    query: UserQuery,
    variables: { page: 1, limit: 10, name: searchName },
  });

  const { data, error } = result;
  const userDetail: UsersDetail | undefined = data?.users;
  if (error && error.message != 'failed find data product: data not found') {
    if (error.message == '[Network] Unauthorized') {
      setTokens('');
      return;
    }

    <p>Oh no... {error.message}</p>;
  }

  const DeleteOne = (_id: string) => {
    deleteUser({ _id }).then((res) => {
      if (res.error) {
        console.error('Oh no!', res.error);
        return;
      }
      reexecuteQuery({ requestPolicy: 'network-only' });
    });
  };

  const onInputChange = (el: ChangeEvent<HTMLInputElement>) => {
    setSearchName(el.target.value);
  };

  const onPageChange = () => {
    if (pages > 1) {
      setPages(pages - 1);
    }
  };

  const handleOpen = (data?: UserType) => {
    if (data) {
      setUpdateData(data);
    } else {
      setUpdateData(null);
    }

    setOpen((cur) => !cur);
  };

  const TABS = [
    {
      label: 'All',
      value: 0,
    },
    {
      label: 'Admin',
      value: 1,
    },
    {
      label: 'User',
      value: 2,
    },
  ];

  const TABLE_HEAD = ['Name', 'Email', 'Created', 'Admin', 'Action'];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <UserCreate handleOpen={handleOpen} open={open} updateData={updateData} />
      <CardHeader floated={false} shadow={false} className="rounded-none bg-inherit mb-5">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Users Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              you can manage data users here.
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm" onClick={() => handleOpen()}>
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> New one
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Tabs value="All" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              crossOrigin="anonymous"
              type="text"
              label="Search"
              onChange={onInputChange}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <Card className="w-full h-[80%]">
        <PerfectScrollbar>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userDetail?.data.map((userData, index) => {
                const { _id, name, email, admin, created_at } = userData;
                const isLast = index === data.length - 1;
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {moment(created_at).format('DD MMMM YYYY HH:MM')}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={admin ? 'admin' : 'user'}
                          color={admin ? 'green' : 'blue-gray'}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-2">
                        <Tooltip content="Edit data">
                          <IconButton variant="text" size="sm" onClick={() => handleOpen(userData)}>
                            <PencilIcon className="h-4 w-4 text-gray-900" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete data">
                          <IconButton
                            variant="text"
                            size="sm"
                            disabled={deleteResult.fetching}
                            onClick={() => DeleteOne(_id)}
                          >
                            <TrashIcon strokeWidth={3} className="h-4 w-4 text-gray-900" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </PerfectScrollbar>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div className="flex items-center gap-2">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page {pages} limit 10
            </Typography>
            <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
              Total 10
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" onClick={onPageChange}>
              Previous
            </Button>
            <Button variant="outlined" size="sm" onClick={() => setPages(pages + 1)}>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

const UserWithAuth = withAuth(Users);
export default UserWithAuth;
