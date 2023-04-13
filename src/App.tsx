import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import './App.css';
import { Users } from './pages/users';

function App() {
  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div'>
            Scrut Automation
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingTop: 3 }}>
        <Users />
      </Box>
    </div>
  );
}

export default App;
