import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, ListItemText } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { CustomButton } from '../ui/CustomButton'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { deleteSendList, fetchSendList } from '../../api/api'
import { useDispatch } from 'react-redux'
import { ISendList } from '../../common/interfaces'
import DeleteIcon from '@mui/icons-material/Delete';
import { TFunction } from 'i18next';
import { setApiLoading, setSnackbar } from '../../features/slice/commonslice';
import SendListBody from '../SendListBody/SendListBody';
import CustomDialog from '../ui/CustomDialog';
import CustomApiLoading from '../ui/CustomApiLoading';

const SendList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sendList, setSendList] = useState<ISendList[] | null>(null);
  const [deleteUuid, setDeleteUuid] = useState<string | null>(null);

  const handleEdit = (uuid: string) => {
    navigate(`/sendlist/${uuid}/edit`);
  }

  const handleDelete = async () => {
    if(deleteUuid) {
      try {
        const res = await deleteSendList(deleteUuid);
        setSendList(res.output);
        setIsDialogOpen(false);
        setDeleteUuid('');
        dispatch(setSnackbar({
          isOpen: true,
          message: t(`api.success.${res.message}`),
          severity: 'success'
        }));
      } catch(error) {
        const errorMessage = t(`api.failed.${(error as Error).message}`);
        dispatch(setSnackbar({
          isOpen: true,
          message: errorMessage,
          severity: 'error'
        }));
      }
    }
  }

  const handleResister = () => {
    navigate('/sendlist/new');
  }

  const openDeleteDialog = (event: React.MouseEvent, uuid: string) => {
    event.stopPropagation();
    setDeleteUuid(uuid);
    setIsDialogOpen(true);
  };

  const getSendListFields = (item: ISendList, t: TFunction) => [
    { label: t('send_list.postcard_title'), value: item.postcard_title },
    { label: t('send_list.postcard_sentence'), value: item.postcard_sentence },
    { label: t('send_list.postcard_end'), value: item.postcard_end },
  ];

  const fetchAndSetSendList = async () => {
    try {
      const res = await fetchSendList();
      setSendList(res.output);
    } catch(error) {
      const errorMessage = t(`api.failed.${(error as Error).message}`);
      dispatch(setSnackbar({
        isOpen: true,
        message: errorMessage,
        severity: 'error'
      }));
    } finally {
      dispatch(setApiLoading(false));  
    }
  }

  useEffect(() => {
    dispatch(setApiLoading(true));
    fetchAndSetSendList();
  }, []);

  return (
    <Box>
      <CustomButton variant='contained' onClick={handleResister} sx={{marginBottom: 2}}>
        {t('resister')}
      </CustomButton>
      <Box>
        {sendList && sendList.length > 0 ? (
          <Box>
          {sendList.map((item) => (
            <Accordion key={item.uuid} sx={{marginBottom: 2}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemText primary={item.name} />
                <Box>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => handleEdit(item.uuid)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    aria-label="delete"
                    onClick={(event: React.MouseEvent) => openDeleteDialog(event, item.uuid)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <SendListBody getListFields={getSendListFields} listItem={item}/>
              </AccordionDetails>
            </Accordion>
          ))}
          </Box>
        ) : (
          <CustomApiLoading />
        )}
      </Box>
      <CustomDialog
        isOpen={isDialogOpen}
        title='本当に削除しますか？'
        text='削除すると元には戻せません'
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDelete}
      />
    </Box>
  )
}

export default SendList