import React from 'react';
import { Button } from '@material-tailwind/react';
import ModalFrom from '@components/modals';

function DialogWithForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button onClick={handleOpen}>Sign In</Button>
      <ModalFrom open={open} handleOpen={handleOpen} />
    </>
  );
}

export default DialogWithForm;
