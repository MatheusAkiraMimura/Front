import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "./Routes";
import customTheme from './Assets/Styles/theme';

const App = () => {

    return (
      <ChakraProvider theme={customTheme}>
        <AppRoutes />
      </ChakraProvider>
    );
  };
  
  export default App;