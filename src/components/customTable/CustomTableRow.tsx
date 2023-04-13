import { TableRow } from '@mui/material';
import { memo } from 'react';

const CustomTableRow = ({ children }: CustomTableRowProps) => {
  return <TableRow>{children}</TableRow>;
};

export default memo(CustomTableRow);
