import React from 'react';
import { Button, ButtonProps } from '@mui/material';

// ButtonPropsを継承して、必要に応じてカスタムプロパティを追加する
// interface CustomButtonProps extends ButtonProps {
//   // typeプロパティはButtonPropsに含まれているため、再定義する必要はありません
//   // このインターフェースにカスタムのプロパティが必要な場合はここに追加します
// }

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  // ButtonPropsから継承したpropsをすべて受け取るため、typeなどの個別のprops定義は不要
  ...props // すべてのpropsをこのコンポーネントに渡す
}) => {
  return (
    <Button
      // propsから継承した全てのプロパティをButtonコンポーネントに渡す
      {...props}
    >
      {children}
    </Button>
  );
};
