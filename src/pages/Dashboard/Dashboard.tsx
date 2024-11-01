import { Box } from '@mui/material'
import React, { useState } from 'react'
import { CustomButton } from '../../components/ui/CustomButton';
import SendList from '../../components/SendList/SendList';

interface tabContent {
  label: string;
  component: React.ReactNode;
}
const Dashboard = () => {
  const tabs: tabContent[] = [
    { label: 'Tab 1', component: <SendList /> },
    { label: 'Tab 2', component: <SendList /> },
  ];

  const [activeTab, setActiveTab] = useState<number>(0);


  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {tabs.map((tab, index) => (
          <CustomButton
            key={index}
            variant={activeTab === index ? 'contained' : 'outlined'}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </CustomButton>
        ))}
      </Box>
      {tabs[activeTab].component}
    </>
  )
}

export default Dashboard