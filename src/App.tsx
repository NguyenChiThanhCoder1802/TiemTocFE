import { Box } from '@mui/material';
import AppRouter from './routes/AppRouter';
import ChatWidget from './components/ChatBox/ChatWidget';
function App() {
  return (
    <Box>     
      <AppRouter />   
      <ChatWidget/>
    </Box>
  );
}
export default App;
