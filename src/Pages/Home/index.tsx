import React, { useContext, useState } from 'react';
import MasterPage from '../../Components/Layout/Master';
import { Text, VStack, Spinner } from '@chakra-ui/react';

import { HomeContext } from './Context';

const Home = () => {


  const [showModal, setShowModal] = useState(false);

    // Contexto
    const contexto = useContext(HomeContext);
    if (!contexto) {
      return (
        <VStack>
          <Spinner style={{ width: "105px", height: "105px" }} color="blue.500" />
          <Text mt={3} fontSize="xl">
            Carregando...
          </Text>
        </VStack>
      );
    }
  
    const { InformacoesAkira, MeusConhecimentos } = contexto;

  return (
    <MasterPage paginaAtual="home" setShowModal={setShowModal} showModal={showModal}>
      
      <InformacoesAkira />

      <MeusConhecimentos />

    </MasterPage>
  );
};

export default Home;

