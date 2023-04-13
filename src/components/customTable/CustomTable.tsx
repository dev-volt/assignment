import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { memo } from 'react';

const CustomTable = ({ columns, children }: CustomTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ overflowX: 'auto', maxWidth: '100%' }}
    >
      <Table sx={{ minWidth: 650, width: '100%' }}>
        <TableHead sx={{ backgroundColor: '#000' }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={{ color: '#fff' }} key={column.id}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(CustomTable);
