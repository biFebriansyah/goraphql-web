import { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Product, Newproduct } from '@utils/constant';
import { useMutation, gql } from 'urql';

const UpdateMutation = gql`
  mutation ($_id: String!, $name: String, $price: Int, $stock: Int) {
    updateProduct(input: { _id: $_id, name: $name, price: $price, stock: $stock }) {
      _id
    }
  }
`;

const CreateMutation = gql`
  mutation ($name: String!, $price: Int!, $stock: Int!) {
    createProduct(input: { name: $name, price: $price, stock: $stock }) {
      _id
    }
  }
`;

type PropsList = {
  open: boolean;
  updateData: Product | null;
  handleOpen: () => void;
};

const AddProductDialog: FunctionComponent<PropsList> = ({ handleOpen, open, updateData }) => {
  const [updateResult, updateProd] = useMutation(UpdateMutation);
  const [createResult, createProd] = useMutation(CreateMutation);
  const [newProduct, setNewProduct] = useState<Newproduct | Product>({
    name: '',
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (open && updateData) {
      setNewProduct(updateData);
    }
    return () => {
      setNewProduct({ name: '', price: 0, stock: 0 });
    };
  }, [open]);

  const onInputChange = (el: ChangeEvent<HTMLInputElement>) => {
    const tmpData = { ...newProduct };
    const elementName = el.target.name as keyof Newproduct;
    tmpData[elementName] = el.target.value;
    setNewProduct(tmpData);
  };

  const CreateOne = () => {
    console.log(newProduct);
    createProd(newProduct).then((res) => {
      if (res.error) {
        console.error('Oh no!', res.error);
        return;
      }
      handleOpen();
    });
  };

  const UpdateOne = () => {
    console.log(newProduct);
    updateProd(newProduct).then((res) => {
      if (res.error) {
        console.error('Oh no!', res.error);
        return;
      }
      handleOpen();
    });
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {updateData ? 'Update Product' : 'Create Product'}
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Fill all the input bellow and save.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Name
            </Typography>
            <Input
              crossOrigin="anonymouse"
              color="gray"
              size="lg"
              placeholder="Indomie goreng"
              name="name"
              onChange={onInputChange}
              value={newProduct.name}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Price
              </Typography>
              <Input
                crossOrigin="anonymouse"
                color="gray"
                size="lg"
                placeholder="10000"
                value={newProduct.price}
                onChange={onInputChange}
                name="price"
              />
            </div>
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Stock
              </Typography>
              <Input
                crossOrigin="anonymouse"
                color="gray"
                size="lg"
                placeholder="8"
                value={newProduct.stock}
                onChange={onInputChange}
                name="stock"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          {updateData ? (
            <Button className="ml-auto" onClick={UpdateOne} disabled={updateResult.fetching}>
              Update
            </Button>
          ) : (
            <Button className="ml-auto" onClick={CreateOne} disabled={createResult.fetching}>
              Save
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddProductDialog;
