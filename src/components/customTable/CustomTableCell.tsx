import { TableCell } from '@mui/material';
import { memo } from 'react';

const CustomTableCell = ({ children }: CustomTableCellProps) => {
  return (
    <TableCell
      sx={{
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </TableCell>
  );
};

export default memo(CustomTableCell);
