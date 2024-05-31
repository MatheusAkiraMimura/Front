import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Heading, Image, Progress, SimpleGrid, Text, useBreakpointValue, useColorMode, useColorModeValue } from '@chakra-ui/react';
import MasterPage from '../../../../Components/Layout/Master';
import NavEntreProjetos from '../../ParcialView/NavEntreProjetos';
import TipoDeJogoMemoria from './ParcialView/TipoDeJogo';

// Imagens
import terrestre1 from './Assets/Terrestres/1.png';
import terrestre2 from './Assets/Terrestres/2.png';
import terrestre3 from './Assets/Terrestres/3.png';
import terrestre4 from './Assets/Terrestres/4.png';
import terrestre5 from './Assets/Terrestres/5.png';
import terrestre6 from './Assets/Terrestres/6.png';
import terrestre7 from './Assets/Terrestres/7.png';
import terrestre8 from './Assets/Terrestres/8.png';
import terrestre9 from './Assets/Terrestres/9.png';
import terrestre10 from './Assets/Terrestres/10.png';

import aves1 from './Assets/Aves/1.png';
import aves2 from './Assets/Aves/2.png';
import aves3 from './Assets/Aves/3.png';
import aves4 from './Assets/Aves/4.png';
import aves5 from './Assets/Aves/5.png';
import aves6 from './Assets/Aves/6.png';
import aves7 from './Assets/Aves/7.png';
import aves8 from './Assets/Aves/8.png';
import aves9 from './Assets/Aves/9.png';
import aves10 from './Assets/Aves/10.png';

import marinho1 from './Assets/Marinho/1.png';
import marinho2 from './Assets/Marinho/2.png';
import marinho3 from './Assets/Marinho/3.png';
import marinho4 from './Assets/Marinho/4.png';
import marinho5 from './Assets/Marinho/5.png';
import marinho6 from './Assets/Marinho/6.png';
import marinho7 from './Assets/Marinho/7.png';
import marinho8 from './Assets/Marinho/8.png';
import marinho9 from './Assets/Marinho/9.png';
import marinho10 from './Assets/Marinho/10.png';

type Card = {
    id: number;
    image: string;
    pairId: number;
    isFlipped: boolean;
    isMatched: boolean;
};

const MemoryGame = () => {
    // Json
    const animaisTerrestres = [
        { id: 1, pairId: 1, image: terrestre1, isFlipped: false, isMatched: false },
        { id: 2, pairId: 1, image: terrestre1, isFlipped: false, isMatched: false },

        { id: 3, pairId: 2, image: terrestre2, isFlipped: false, isMatched: false },
        { id: 4, pairId: 2, image: terrestre2, isFlipped: false, isMatched: false },

        { id: 5, pairId: 3, image: terrestre3, isFlipped: false, isMatched: false },
        { id: 6, pairId: 3, image: terrestre3, isFlipped: false, isMatched: false },

        { id: 7, pairId: 4, image: terrestre4, isFlipped: false, isMatched: false },
        { id: 8, pairId: 4, image: terrestre4, isFlipped: false, isMatched: false },

        { id: 9, pairId: 5, image: terrestre5, isFlipped: false, isMatched: false },
        { id: 10, pairId: 5, image: terrestre5, isFlipped: false, isMatched: false },

        { id: 11, pairId: 6, image: terrestre6, isFlipped: false, isMatched: false },
        { id: 12, pairId: 6, image: terrestre6, isFlipped: false, isMatched: false },

        { id: 13, pairId: 7, image: terrestre7, isFlipped: false, isMatched: false },
        { id: 14, pairId: 7, image: terrestre7, isFlipped: false, isMatched: false },

        { id: 15, pairId: 8, image: terrestre8, isFlipped: false, isMatched: false },
        { id: 16, pairId: 8, image: terrestre8, isFlipped: false, isMatched: false },

        { id: 17, pairId: 9, image: terrestre9, isFlipped: false, isMatched: false },
        { id: 18, pairId: 9, image: terrestre9, isFlipped: false, isMatched: false },

        { id: 19, pairId: 10, image: terrestre10, isFlipped: false, isMatched: false },
        { id: 20, pairId: 10, image: terrestre10, isFlipped: false, isMatched: false },
    ];

    const animaisAereos = [
        { id: 1, pairId: 1, image: aves1, isFlipped: false, isMatched: false },
        { id: 2, pairId: 1, image: aves1, isFlipped: false, isMatched: false },

        { id: 3, pairId: 2, image: aves2, isFlipped: false, isMatched: false },
        { id: 4, pairId: 2, image: aves2, isFlipped: false, isMatched: false },

        { id: 5, pairId: 3, image: aves3, isFlipped: false, isMatched: false },
        { id: 6, pairId: 3, image: aves3, isFlipped: false, isMatched: false },

        { id: 7, pairId: 4, image: aves4, isFlipped: false, isMatched: false },
        { id: 8, pairId: 4, image: aves4, isFlipped: false, isMatched: false },

        { id: 9, pairId: 5, image: aves5, isFlipped: false, isMatched: false },
        { id: 10, pairId: 5, image: aves5, isFlipped: false, isMatched: false },

        { id: 11, pairId: 6, image: aves6, isFlipped: false, isMatched: false },
        { id: 12, pairId: 6, image: aves6, isFlipped: false, isMatched: false },

        { id: 13, pairId: 7, image: aves7, isFlipped: false, isMatched: false },
        { id: 14, pairId: 7, image: aves7, isFlipped: false, isMatched: false },

        { id: 15, pairId: 8, image: aves8, isFlipped: false, isMatched: false },
        { id: 16, pairId: 8, image: aves8, isFlipped: false, isMatched: false },

        { id: 17, pairId: 9, image: aves9, isFlipped: false, isMatched: false },
        { id: 18, pairId: 9, image: aves9, isFlipped: false, isMatched: false },

        { id: 19, pairId: 10, image: aves10, isFlipped: false, isMatched: false },
        { id: 20, pairId: 10, image: aves10, isFlipped: false, isMatched: false },
    ];

    const animaisMarinhos = [
        { id: 1, pairId: 1, image: marinho1, isFlipped: false, isMatched: false },
        { id: 2, pairId: 1, image: marinho1, isFlipped: false, isMatched: false },

        { id: 3, pairId: 2, image: marinho2, isFlipped: false, isMatched: false },
        { id: 4, pairId: 2, image: marinho2, isFlipped: false, isMatched: false },

        { id: 5, pairId: 3, image: marinho3, isFlipped: false, isMatched: false },
        { id: 6, pairId: 3, image: marinho3, isFlipped: false, isMatched: false },

        { id: 7, pairId: 4, image: marinho4, isFlipped: false, isMatched: false },
        { id: 8, pairId: 4, image: marinho4, isFlipped: false, isMatched: false },

        { id: 9, pairId: 5, image: marinho5, isFlipped: false, isMatched: false },
        { id: 10, pairId: 5, image: marinho5, isFlipped: false, isMatched: false },

        { id: 11, pairId: 6, image: marinho6, isFlipped: false, isMatched: false },
        { id: 12, pairId: 6, image: marinho6, isFlipped: false, isMatched: false },

        { id: 13, pairId: 7, image: marinho7, isFlipped: false, isMatched: false },
        { id: 14, pairId: 7, image: marinho7, isFlipped: false, isMatched: false },

        { id: 15, pairId: 8, image: marinho8, isFlipped: false, isMatched: false },
        { id: 16, pairId: 8, image: marinho8, isFlipped: false, isMatched: false },

        { id: 17, pairId: 9, image: marinho9, isFlipped: false, isMatched: false },
        { id: 18, pairId: 9, image: marinho9, isFlipped: false, isMatched: false },

        { id: 19, pairId: 10, image: marinho10, isFlipped: false, isMatched: false },
        { id: 20, pairId: 10, image: marinho10, isFlipped: false, isMatched: false },
    ];

    // Função para embaralhar as cartas
    const shuffleCards = (cards: Card[]): Card[] => {
        let shuffledCards = [...cards]; // Copia o array de cartas
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        return shuffledCards;
    };

    // UseStates
    const [cards, setCards] = useState<Card[]>(shuffleCards(animaisTerrestres));
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [tempoPausado, setTempoPausado] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [pontos, setPontos] = useState(0);
    const [tipoJogo, setTipoJogo] = useState("");
    const [isProcessingClick, setIsProcessingClick] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Lógica para lidar com o clique na carta
    const handleCardClick = (cardId: number) => {
        // Verificar se a carta já foi virada ou encontrada
        setIsProcessingClick(true);

        const clickedCard = cards.find(card => card.id === cardId);
        if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length >= 2 || gameCompleted) {
            return; // Ignorar cliques em cartas já viradas, encontradas, quando já há duas cartas viradas ou quando o jogo já foi concluído
        }

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        const newCardsState = cards.map(card => {
            if (newFlippedCards.includes(card.id)) {
                return { ...card, isFlipped: true };
            }
            return card;
        });
        setCards(newCardsState);

        if (newFlippedCards.length === 2) {
            const [firstCard, secondCard] = newFlippedCards.map(id => newCardsState.find(card => card.id === id));
            if (firstCard && secondCard && firstCard.image === secondCard.image) {
                setScore(prevScore => prevScore + 1);

                setFlippedCards([]);


            } else {
                setTimeout(() => {
                    const resetCardsState = newCardsState.map(card => {
                        if (newFlippedCards.includes(card.id)) {
                            return { ...card, isFlipped: false };
                        }
                        return card;
                    });
                    setCards(resetCardsState);
                    setFlippedCards([]); // Limpa as cartas viradas após não encontrar um par
                    setIsProcessingClick(false);
                }, 1000); // Tempo de atraso antes de virar as cartas de volta
            }
        }
    };

    const resetGame = (tipoJogoEscolhido: string) => {
        if (tipoJogoEscolhido === "marinho") {
            setCards(shuffleCards(animaisMarinhos));
        } else if (tipoJogoEscolhido === "aereo") {
            setCards(shuffleCards(animaisAereos));
        } else {
            setCards(shuffleCards(animaisTerrestres));
        }
        setFlippedCards([]);
        setScore(0);
        setElapsedTime(0);
        setGameCompleted(false);
        setTempoPausado(0)
        setPontos(0)
        setIsProcessingClick(false);
    };

    useEffect(() => {
        // Verificar se o jogo foi concluído
        if (score === animaisTerrestres.length / 2 && elapsedTime && !gameCompleted) {
            setGameCompleted(true);
            setTempoPausado(elapsedTime)
        }
    }, [elapsedTime, animaisTerrestres, score, gameCompleted]);

    // Iniciar o cronômetro quando o componente for montado
    useEffect(() => {
        const intervalId = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (gameCompleted === true) {
            // Cálculo base da pontuação
            let pontuacaoBase = (score * 8000) / tempoPausado;

            // Ajusta a pontuação para a escala de 1000 pontos
            let pontuacaoAjustada = (pontuacaoBase * 1000) / (8 * 8000 / 30);

            // Limita a pontuação máxima a 1000 pontos
            const pontuacaoTotal = Math.min(Math.round(pontuacaoAjustada), 1000);

            setPontos(pontuacaoTotal);
        }
    }, [gameCompleted, score, tempoPausado]);


    // Função para formatar o tempo no formato de relógio (00:00)
    const formatTime = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.300', 'gray.600');
    const color = useColorModeValue('black', 'white');
    const buttonColorScheme = useColorModeValue('blue', 'orange');

    const onSelectType = (typeName: any) => {
        if (!isProcessingClick && flippedCards.length === 0) {
            setTipoJogo(typeName);
            resetGame(typeName)
        } else {
            resetGame(tipoJogo)
        }
    };

    useEffect(() => {
        if (tipoJogo !== "") {
            resetGame(tipoJogo)
        }

    }, [tipoJogo]);

    return (
        <MasterPage paginaAtual="projetos" setShowModal={setShowModal} showModal={showModal}>
            <NavEntreProjetos rota='projetos' textoIconButton='Voltar para Projetos' textoButton='Projetos'>
                <Heading ml={8} size="lg">Jogo da memória</Heading>
            </NavEntreProjetos>

            <Box mt="3rem">
            <TipoDeJogoMemoria onSelectType={onSelectType} bloquearClique={!isProcessingClick && flippedCards.length === 0 ? false : true} />
            </Box>


            <Grid maxW="100rem" px="1rem" m="3rem auto" templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={4}>
                <Box pr={4}>
                    <SimpleGrid columns={useBreakpointValue({ base: 3, md: 4 })} spacing={5} justifyItems="center">
                        {cards.filter(card => !card.isMatched).map((card) => (
                            <Box
                                key={card.id}
                                w="100px"
                                h="100px"
                                p={card.image.startsWith('data:image/') ? "0" : "10px"}
                                bg={card.isFlipped ? 'white' : 'gray.200'}
                                boxShadow="md"
                                rounded="md"
                                backgroundImage={card.isFlipped ? `url(${card.image})` : ''}
                                backgroundSize="cover"
                                transition="transform 0.3s, background-color 0.3s"
                                transform={card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
                                onClick={() => handleCardClick(card.id)}
                                cursor="pointer"
                            >
                                {card.image.startsWith('data:image/') && card.isFlipped ? <Image src={card.image} rounded="md" /> : ""}
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>

                <Box textAlign="center" bg={bgColor} color={color} p={4} rounded="lg" boxShadow="xl" m={{ base: "3rem 0", md: "6rem 0" }}>
                    <Text fontSize="3xl" fontWeight="bold" mb={4}>Resultado do Jogo</Text>

                    <Grid
                        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                        gap={6}
                        mb={4}
                    >
                        <Box>
                            <Text fontSize="xl" mb={2}>Última pontuação</Text>
                            <Progress colorScheme={colorMode === 'light' ? 'purple' : 'pink'} value={pontos} max={1000} height="32px" />
                            <Text mt={2}>{pontos} / 1000</Text>

                        </Box>

                        <Box>
                            <Text fontSize="xl" mb={2}>Recorde</Text>
                            <Progress colorScheme={colorMode === 'light' ? 'blue' : 'green'} value={pontos} max={1000} height="32px" />
                            <Text mt={2}>{pontos} / 1000</Text>
                        </Box>
                    </Grid>

                    <Box mb={4}>
                        <Text fontSize="xl">Tempo</Text>
                        <Text fontSize="2xl" fontWeight="semibold">
                            {tempoPausado !== 0 ? formatTime(tempoPausado) : formatTime(elapsedTime)}
                        </Text>
                    </Box>

                    <Button
                        colorScheme={buttonColorScheme}
                        onClick={() => resetGame(tipoJogo)}
                        borderRadius="md"
                        size="lg"
                        _hover={{ bg: `${buttonColorScheme}.600` }}
                    >
                        Reiniciar Jogo
                    </Button>
                </Box>

            </Grid>
        </MasterPage >
    );
};

export default MemoryGame;
