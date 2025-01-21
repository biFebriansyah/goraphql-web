import { FunctionComponent } from 'react';
import { Dialog, Spinner } from '@material-tailwind/react';

type PropsList = {
  open: boolean;
  handleOpen: () => void;
};

const DialogWithForm: FunctionComponent<PropsList> = ({ open, handleOpen }) => {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="xs"
      className="place-items-center bg-transparent shadow-none text-white"
    >
      <Spinner className="h-16 w-16 text-white" color="gray" />
    </Dialog>
  );
};

export default DialogWithForm;
