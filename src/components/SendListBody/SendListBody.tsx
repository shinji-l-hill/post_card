import { Box, IconButton, Link, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { ISendList } from '../../common/interfaces';
import { TFunction } from 'i18next';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../features/slice/commonslice';

interface Props {
  getListFields: (item: ISendList, t: TFunction) => {
    label: string;
    value: string
  }[];
  listItem: ISendList;
}


const SendListBody = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    getListFields,
    listItem
  } = props

  const baseUrl = import.meta.env.VITE_URL_APP;
  const postcardUrl = `${baseUrl}/postcard/${listItem.uuid}`;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(postcardUrl);
      dispatch(setSnackbar({
        isOpen: true,
        message: t(`URLをクリップボードにコピーしました`),
        severity: 'success'
      }))
    } catch (error) {
      dispatch(setSnackbar({
        isOpen: true,
        message: t(`クリップボードへのコピーに失敗しました`),
        severity: 'error'
      }))
    }
  };

  return (
    <List>
      {getListFields(listItem, t).map((field, index) => (
        <React.Fragment key={index}>
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {field.label}
            </Typography>
            <Typography variant="body2" color={field.value ? 'textPrimary' : 'textSecondary'}>
              {field.value ?? t('empty_sentence')}
            </Typography>
          </ListItem>
        </React.Fragment>
      ))}
      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                {'年賀状URL'}
              </Typography>
              <IconButton onClick={handleCopyClick} aria-label="コピー">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
            <Link target="_blank" href={postcardUrl} variant="body2" color='textPrimary'>
              {postcardUrl}
            </Link>
      </ListItem>
    </List>
  )
}

export default SendListBody