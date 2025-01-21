import { FunctionComponent, useState, ChangeEvent, useEffect } from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from '@material-tailwind/react';
import { UserSignup, Users } from '@utils/constant';
import { useMutation, gql } from 'urql';

const UserUpdateMutation = gql`
  mutation ($_id: String!, $name: String, $email: String, $password: String, $admin: Boolean) {
    updateUser(
      input: { _id: $_id, name: $name, email: $email, password: $password, admin: $admin }
    ) {
      _id
    }
  }
`;

const UserCreateMutation = gql`
  mutation ($name: String!, $email: String!, $password: String!, $admin: Boolean) {
    signUp(input: { name: $name, email: $email, password: $password, admin: $admin }) {
      _id
    }
  }
`;

type PropsList = {
  open: boolean;
  updateData: Users | null;
  handleOpen: () => void;
};

const DialogWithForm: FunctionComponent<PropsList> = ({ open, handleOpen, updateData }) => {
  const [updateResult, updateUser] = useMutation(UserUpdateMutation);
  const [createResult, createUser] = useMutation(UserCreateMutation);
  const [signUpData, setSignUpData] = useState<UserSignup | Users>({
    name: '',
    email: '',
    password: '',
    admin: false,
  });

  useEffect(() => {
    if (open && updateData) {
      setSignUpData(updateData);
    }

    return () => {
      setSignUpData({ name: '', email: '', password: '', admin: false });
    };
  }, [open]);

  const onInputChange = (el: ChangeEvent<HTMLInputElement>) => {
    const tmpData = { ...signUpData };
    const elementName = el.target.name as keyof UserSignup;
    if (elementName === 'admin') {
      const adminValue = el.target.checked;
      tmpData['admin'] = adminValue;
    } else {
      tmpData[elementName] = el.target.value;
    }

    setSignUpData(tmpData);
  };

  const CreateOne = () => {
    createUser(signUpData).then((res) => {
      if (res.error) {
        console.error('Oh no!', res.error);
        return;
      }

      handleOpen();
    });
  };

  const UpdateOne = () => {
    const dataToSend = { ...signUpData, password: signUpData.password || null };
    updateUser(dataToSend).then((res) => {
      if (res.error) {
        console.error('Oh no!', res.error);
        return;
      }
      handleOpen();
    });
  };

  return (
    <>
      <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {updateData ? 'Update User' : 'Create User'}
            </Typography>
            <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
              fill all the input bellow and save.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Name
            </Typography>
            <Input
              crossOrigin="anoymouse"
              value={signUpData.name}
              label="Name"
              size="lg"
              name="name"
              onChange={onInputChange}
            />
            <Typography className="-mb-2" variant="h6">
              Email
            </Typography>
            <Input
              crossOrigin="anoymouse"
              value={signUpData.email}
              label="Email"
              size="lg"
              name="email"
              onChange={onInputChange}
            />
            <Typography className="-mb-2" variant="h6">
              Password
            </Typography>
            <Input
              crossOrigin="anoymouse"
              label="Password"
              size="lg"
              name="password"
              onChange={onInputChange}
            />
            <div className="-ml-2.5 -mt-3">
              <Checkbox
                crossOrigin="anoymouse"
                checked={signUpData.admin}
                label="Admin"
                onChange={onInputChange}
                name="admin"
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            {updateData ? (
              <Button
                variant="gradient"
                disabled={updateResult.fetching}
                onClick={UpdateOne}
                fullWidth
              >
                Update
              </Button>
            ) : (
              <Button
                variant="gradient"
                disabled={createResult.fetching}
                onClick={CreateOne}
                fullWidth
              >
                Save
              </Button>
            )}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default DialogWithForm;
