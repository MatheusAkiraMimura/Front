import { extendTheme, keyframes } from '@chakra-ui/react';


const blinkAnimation = keyframes`
  0% { background-color: white; }
  50% { background-color: lightgreen; }
  100% { background-color: white; }
`;

const customTheme = extendTheme({
  styles: {
    global: {
      // Defina suas classes de animação personalizadas aqui
      '.matching': {
        animation: `${blinkAnimation} 1s ease-in-out`,
      },
    },
  },
});

export default customTheme;
