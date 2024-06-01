import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useToast,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import getCroppedImg from "./croppedImg"; // Função auxiliar para realizar o corte
import MasterPage from "../../../Components/Layout/Master";
import {
  BDDeleteImagem,
  BDImagens,
  BDUploadImagem,
} from "../../../Api/bancoDados";
import TabelaImagens from "./ParcialView";
import NavEntreProjetos from "../ParcialView/NavEntreProjetos";

interface Imagem {
  id: number;
  userId: number;
  caminhoDaImagem: string;
}

const UploadImageComponent = () => {
  const toast = useToast();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [salvouImagem, setSalvouImagem] = useState(true);
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");



  // Responsividade
  const isMobile = useBreakpointValue({ base: true, md: false });
  const stepDirection = useBreakpointValue<"horizontal" | "vertical">({ base: "vertical", md: "horizontal" });

  // Fator de ajuste de zoom
  const zoomFactor = 0.1;

  // UseColorModeValue
  const bgColor = useColorModeValue("white", "gray.700");

  // JSON
  const steps = [
    {
      title: "Selecionar Imagem",
      description: "Escolha a imagem que deseja carregar",
    },
    { title: "Corte de Imagem", description: "Ajuste e corte sua imagem" },
    { title: "Salvar Imagem", description: "Salve a imagem editada" },
  ];

  const savedIdentifier = localStorage.getItem("userIdentifier");

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => setImageSrc(reader.result as string));
    reader.readAsDataURL(file);
    setActiveStep(1);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as any,
  });

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) {
      console.error("Imagem não carregada ou área de corte não especificada");
      return;
    }

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      setActiveStep(2);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handleZoomChange = (newZoom: number) => {
    const adjustedZoom = zoom + (newZoom - zoom) * zoomFactor;
    const centerX = crop.x + (400 * zoom) / 2;
    const centerY = crop.y + (400 * zoom) / 2;
    const newCenterX = centerX * (adjustedZoom / zoom);
    const newCenterY = centerY * (adjustedZoom / zoom);
    const newCropX = newCenterX - (400 * adjustedZoom) / 2;
    const newCropY = newCenterY - (400 * adjustedZoom) / 2;

    setCrop({ x: newCropX, y: newCropY });
    setZoom(adjustedZoom);
  };

  const salvarImagem = async () => {
    try {
      if (!savedIdentifier) {
        throw new Error("Identificador do usuário não está presente");
      }
      const response = await BDUploadImagem(croppedImage, savedIdentifier);

      toast({
        title: "Upload com sucesso",
        description: response.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      setSalvouImagem(true);
      setImageSrc(null);
      setCroppedImage(null);
      setActiveStep(0);
    } catch (error: any) {
      let errorMessage = "An error occurred during the upload";
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data.error === "string"
      ) {
        errorMessage = error.response.data.error;
      }
      toast({
        title: "Upload Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const onExcluir = async (imagemId: any) => {
    try {
      await BDDeleteImagem(imagemId);
      setImagens(imagens.filter((imagem) => imagem.id !== imagemId));
      toast({
        title: "Imagem apagada",
        description: `A imagem foi deletada com sucesso!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      const errorMessage =
        error.data || "Erro desconhecido ao buscar imagens BD.";
      toast({
        title: "Erro ao apagar imagem.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const buscarImagensBD = async () => {
      try {
        const dadosApi = await BDImagens();
        if (dadosApi.data) {
          setImagens(dadosApi.data);
        }
      } catch (error: any) {
        console.log(error);
        const errorMessage =
          error.response?.data || "Erro desconhecido ao buscar imagens BD.";
        toast({
          title: "Erro ao buscar imagens BD.",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    };

    if (salvouImagem === true) {
      buscarImagensBD();
      setSalvouImagem(false);
    }
  }, [salvouImagem, toast, setImagens, setSalvouImagem]);

  useEffect(() => {
    if (savedIdentifier) {
      const [savedName] = savedIdentifier.split("-");
      setUserName(savedName);
    }
  }, []);



  return (
    <MasterPage
      paginaAtual="projetos"
      setShowModal={setShowModal}
      showModal={showModal}
    >
      <>
        <NavEntreProjetos
          rota="projetos"
          textoIconButton="Voltar para Projetos"
          textoButton="Projetos"
        >
          <Heading ml={8} size="lg">
            Upload e Delete de Imagens
            <Text fontSize="1.6rem" align="center" >{userName}</Text>
          </Heading>

     
        </NavEntreProjetos>

        <Box
          bg={bgColor}
          borderRadius="md"
          boxShadow="md"
          p={4}
          maxW="50rem"
          m="3rem auto"
        >
          <Stepper index={activeStep} orientation={stepDirection}>
            {steps.map((step, index) => (
              <Step
                key={index}
                onClick={() => {
                  if (index <= activeStep) {
                    setActiveStep(index);
                  }

                  if (index === 1) {
                    setCroppedImage(null);
                  }

                  if (index === 0) {
                    setImageSrc(null);
                    setCroppedImage(null);
                  }
                }}
              >
                <StepIndicator style={{ cursor: "pointer" }}>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          <Flex
            direction={isMobile ? "column" : "row"}
            justify="center"
            wrap="wrap"
            gap={4}
          >
            {!croppedImage && (
              <Box w="100%" mt="2rem">
                {!imageSrc && (
                  <Box
                    {...getRootProps()}
                    p={5}
                    border="2px dashed gray"
                    borderRadius="md"
                  >
                    <input {...getInputProps()} />
                    <Text>
                      Arraste e solte uma imagem aqui, ou clique para selecionar
                      uma
                    </Text>
                  </Box>
                )}

                {imageSrc && (
                  <>
                    <Box
                      position="relative"
                      height="400px"
                      w="100%"
                      maxWidth="400px"
                      m="0 auto"
                    >
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onZoomChange={handleZoomChange}
                        onCropComplete={onCropComplete}
                      />
                    </Box>
                    <Box textAlign="center" my={6}>
                      <Button colorScheme="blue" onClick={showCroppedImage}>
                        Cortar Imagem
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            )}

            {croppedImage && (
              <Box mt="2rem">
                <Box
                  maxW="30rem"
                  w="100%"
                  p={5}
                  textAlign="center"
                  border="1px solid lightgray"
                  borderRadius="lg"
                  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
                  bg="white"
                  m="0 auto 1rem auto"
                >
                  <Image
                    src={croppedImage}
                    alt="Cropped image"
                    borderRadius="md"
                    boxShadow="0px 8px 15px rgba(0, 0, 0, 0.2)"
                  />
                </Box>

                <Box textAlign="center">
                  <Button colorScheme="blue" onClick={salvarImagem}>
                    Salvar Imagem
                  </Button>
                </Box>
              </Box>
            )}
          </Flex>
        </Box>

        <Box p={4} maxW="75rem" m="0 auto" mt={10}>
          <TabelaImagens imagens={imagens} onExcluir={onExcluir} />
          
        </Box>
      </>
    </MasterPage>
  );
};

export default UploadImageComponent;
