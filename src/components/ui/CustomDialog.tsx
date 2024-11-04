import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface Props {
  isOpen: boolean;
  title: string;
  text: string;
  onClose: () => void;
  onSubmit: () => void;
}

const CustomDialog = (props: Props) => {
  const {
    isOpen,
    title,
    text,
    onClose,
    onSubmit
  } = props
  return (
    <Dialog
    open={isOpen}
    keepMounted
    onClose={onClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button onClick={onSubmit}>実行する</Button>
    </DialogActions>
  </Dialog>
  )
}

export default CustomDialog