import { useCallback, useEffect, useMemo, useState } from 'react';
import data from '../../mock.json';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { debounce } from 'lodash';

import {
  CustomTable,
  CustomTableCell,
  CustomTableRow,
} from '../../components/customTable';

import './Users.css';

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'first_name', label: 'First Name' },
  { id: 'last_name', label: 'Last Name' },
  { id: 'email', label: 'Email' },
  { id: 'gender', label: 'Gender' },
  { id: 'address', label: 'Address' },
  { id: 'state', label: 'State' },
  { id: 'ip_address', label: 'IP Address' },
  { id: 'mac', label: 'MAC' },
  { id: 'status', label: 'Status' },
];

const Users = () => {
  const [inputText, setInputText] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');

  const [filterColumn, setFilterColumn] = useState<{ [key: string]: string }>({
    state: '',
    gender: '',
  });

  useEffect(() => {
    const debouncedSearch = debounce((text: string) => {
      setDebouncedSearchText(text);
    }, 500);

    debouncedSearch(inputText);
  }, [inputText]);

  const filteredData = useMemo(() => {
    return data
      .filter((row) => {
        return (
          (filterColumn.state === '' || row.state === filterColumn.state) &&
          (filterColumn.gender === '' || row.gender === filterColumn.gender)
        );
      })
      .filter((row: any) => {
        if (debouncedSearchText === '') {
          return true;
        }

        return columns.some((column) => {
          const value = row[column.id];
          return (
            typeof value === 'string' &&
            value.toLowerCase().includes(debouncedSearchText.toLowerCase())
          );
        });
      });
  }, [data, debouncedSearchText, filterColumn]);

  const handleInputTextChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setInputText(event.target.value);
      },
      [debouncedSearchText]
    );

  const handleFilterColumnChange = useCallback(
    (event: SelectChangeEvent<string>, columnId: string) => {
      setFilterColumn((prevFilterColumn) => ({
        ...prevFilterColumn,
        [columnId]: event.target.value,
      }));
    },
    [filterColumn]
  );

  return (
    <Container maxWidth='xl'>
      <div>
        <div className='user__container'>
          <Typography variant='h3' component='div'>
            Users
          </Typography>

          <div className='searchFilterContainer'>
            <div className='searchFilterItem'>
              <TextField
                label='Search'
                value={inputText}
                onChange={handleInputTextChange}
                fullWidth
              />
            </div>
            <div className='searchFilterItem'>
              <FormControl variant='outlined' fullWidth>
                <InputLabel htmlFor='state-filter-dropdown'>
                  Filter by State
                </InputLabel>
                <Select
                  id='state-filter-dropdown'
                  label='Filter by State'
                  value={filterColumn.state}
                  onChange={(e) => handleFilterColumnChange(e, 'state')}
                >
                  <MenuItem value=''>All</MenuItem>
                  {Array.from(new Set(data.map((row) => row.state))).map(
                    (state, index) => (
                      <MenuItem key={index} value={state}>
                        {state}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </div>
            <div className='searchFilterItem'>
              <FormControl variant='outlined' fullWidth>
                <InputLabel htmlFor='gender-filter-dropdown'>
                  Filter by Gender
                </InputLabel>
                <Select
                  id='gender-filter-dropdown'
                  label='Filter by Gender'
                  value={filterColumn.gender}
                  onChange={(e) => handleFilterColumnChange(e, 'gender')}
                >
                  <MenuItem value=''>All</MenuItem>
                  {Array.from(new Set(data.map((row) => row.gender))).map(
                    (gender, index) => (
                      <MenuItem key={index} value={gender}>
                        {gender}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <CustomTable columns={columns}>
          {filteredData.map((row) => (
            <CustomTableRow key={row.id}>
              <CustomTableCell>{row.id}</CustomTableCell>
              <CustomTableCell>{row.first_name}</CustomTableCell>
              <CustomTableCell>{row.last_name}</CustomTableCell>
              <CustomTableCell>{row.email}</CustomTableCell>
              <CustomTableCell>{row.gender}</CustomTableCell>
              <CustomTableCell>{row.address}</CustomTableCell>
              <CustomTableCell>{row.state}</CustomTableCell>
              <CustomTableCell>{row.ip_address}</CustomTableCell>
              <CustomTableCell>{row.mac}</CustomTableCell>
              <CustomTableCell>{row.status}</CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTable>
      </div>
    </Container>
  );
};

export default Users;
