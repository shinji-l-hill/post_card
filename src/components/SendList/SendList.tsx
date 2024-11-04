import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, ListItemText } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { CustomButton } from '../ui/CustomButton'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { fetchSendList } from '../../api/api'
import { useDispatch } from 'react-redux'
import { ISendList } from '../../common/interfaces'
import DeleteIcon from '@mui/icons-material/Delete';
import { TFunction } from 'i18next';
import { setApiLoading, setSnackbar } from '../../features/slice/commonslice';
import CustomLoading from '../ui/CustomApiLoading';
import SendListBody from '../SendListBody/SendListBody';

const SendList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendList, setSendList] = useState<ISendList[] | null>(null);

  const handleEdit = (uuid: string) => {
    navigate(`/sendlist/${uuid}/edit`);
  }

  const handleDelete = (uuid: string) => {
    console.log(uuid);
  }

  const handleResister = () => {
    navigate('/sendlist/new');
  }

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
                    onClick={() => handleDelete(item.uuid)}
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
          <CustomLoading />
        )}
      </Box>
    </Box>
  )
}

export default SendList