import { List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { ISendList } from '../../common/interfaces';
import { TFunction } from 'i18next';

interface Props {
  getListFields: (item: ISendList, t: TFunction) => {
    label: string;
    value: string
  }[];
  listItem: ISendList;
}

const SendListBody = (props: Props) => {
  const { t } = useTranslation();

  const {
    getListFields,
    listItem
  } = props

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
    </List>
  )
}

export default SendListBody