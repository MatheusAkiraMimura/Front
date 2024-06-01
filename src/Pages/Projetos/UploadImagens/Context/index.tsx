import {
  FunctionComponent,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

// Chakra UI components
import {
  Box,
  Button,
  Text,
  Image as ImageChakra,
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
  UseToastOptions,
  ToastId,
  Grid,
  Tooltip,
} from "@chakra-ui/react";
import { SetFunction } from "../../../../Interfaces";
import {
  BDDeleteImagem,
  BDImagens,
  BDUploadImagem,
} from "../../../../Api/bancoDados";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { FaArrowLeft, FaArrowRight, FaTrashAlt } from "react-icons/fa";

//#region Interfaces
interface Imagem {
  id: number;
  userId: number;
  caminhoDaImagem: string;
}

interface IEtapasUpload {
  setImagens: SetFunction<Imagem[]>;
}

interface ITabelaImagens {
  imagens: any[];
  onExcluir: (
    imagemId: any,
    setImagens: SetFunction<Imagem[]>,
    imagens: Imagem[]
  ) => void;
  setImagens: SetFunction<Imagem[]>;
}
//#endregion

//#region types
type BuscarDadosUploadImagensByUser = (
  id: any,
  setForms: SetFunction<any>,
  setIsFormModalOpen: SetFunction<boolean>
) => Promise<void>;

type SalvarImagem = (
  croppedImage: any,
  setSalvouImagem: SetFunction<boolean>,
  setImageSrc: SetFunction<any>,
  setCroppedImage: SetFunction<any>,
  setActiveStep: SetFunction<any>
) => Promise<void>;

type OnExcluir = (
  imagemId: any,
  setImagens: SetFunction<Imagem[]>,
  imagens: Imagem[]
) => Promise<void>;
//#endregion types

//#region interface de Context type
interface UploadImagensContextType {
  navigate: NavigateFunction;

  toast: (options?: UseToastOptions) => ToastId;

  savedIdentifier: string | null;

  isLoading: boolean;
  setIsLoading: SetFunction<boolean>;

  EtapasUpload: FunctionComponent<IEtapasUpload>;
  TabelaImagens: FunctionComponent<ITabelaImagens>;

  onExcluir: OnExcluir;
}
//#endregion interface de Context type

export const UploadImagensContext =
  createContext<UploadImagensContextType | null>(null);

export const UploadImagensProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //#region do navigate
  const navigate = useNavigate();
  //#endregion

  //#region do useToast
  const toast = useToast();
  //#endregion

  //#region do Auth
  const savedIdentifier = localStorage.getItem("userIdentifier");
  //#endregion

  //#region de modal de loading
  const [isLoading, setIsLoading] = useState(false);
  //#endregion

  //#region JSONs
  //#endregion

  //#region Tratamentos
  //#endregion

  //#region funções da index de Contato
  async function CroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
  ) {
    const image = new Image();
    image.src = imageSrc;

    // Carregar a imagem de forma assíncrona
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Não foi possível criar o contexto do canvas");
    }

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
        resolve(window.URL.createObjectURL(file));
      }, "image/jpeg");
    });
  }

  const salvarImagem: SalvarImagem = async (
    croppedImage,
    setSalvouImagem,
    setImageSrc,
    setCroppedImage,
    setActiveStep
  ) => {
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

  const onExcluir: OnExcluir = async (imagemId, setImagens, imagens) => {
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
  //#endregion

  //#region ParcialView
  const SelecionarImagem: React.FC<{
    getRootProps: any;
    getInputProps: any;
  }> = ({ getRootProps, getInputProps }) => (
    <Box
      {...getRootProps()}
      p={5}
      border="2px dashed gray"
      borderRadius="md"
    >
      <input {...getInputProps()} />
      <Text>
        Arraste e solte uma imagem aqui, ou clique para selecionar uma
      </Text>
    </Box>
  );
  
  const CortarImagem: React.FC<{
    imageSrc: string;
    crop: any;
    zoom: number;
    setCrop: any;
    handleZoomChange: any;
    onCropComplete: any;
    showCroppedImage: any;
  }> = ({
    imageSrc,
    crop,
    zoom,
    setCrop,
    handleZoomChange,
    onCropComplete,
    showCroppedImage,
  }) => (
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
  );
  
  const SalvarImagem: React.FC<{
    croppedImage: string;
    salvarImagem: any;
    setSalvouImagem: any;
    setImageSrc: any;
    setCroppedImage: any;
    setActiveStep: any;
  }> = ({
    croppedImage,
    salvarImagem,
    setSalvouImagem,
    setImageSrc,
    setCroppedImage,
    setActiveStep,
  }) => (
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
        <ImageChakra
          src={croppedImage}
          alt="Cropped image"
          borderRadius="md"
          boxShadow="0px 8px 15px rgba(0, 0, 0, 0.2)"
        />
      </Box>
  
      <Box textAlign="center">
        <Button
          colorScheme="blue"
          onClick={() =>
            salvarImagem(
              croppedImage,
              setSalvouImagem,
              setImageSrc,
              setCroppedImage,
              setActiveStep
            )
          }
        >
          Salvar Imagem
        </Button>
      </Box>
    </Box>
  );
  
  const EtapasUpload: React.FC<IEtapasUpload> = ({ setImagens }) => {
    const steps = [
      {
        title: "Selecionar Imagem",
        description: "Escolha a imagem que deseja carregar",
      },
      { title: "Corte de Imagem", description: "Ajuste e corte sua imagem" },
      { title: "Salvar Imagem", description: "Salve a imagem editada" },
    ];
    
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
  
    const isMobile = useBreakpointValue({ base: true, md: false });
    const stepDirection = useBreakpointValue<"horizontal" | "vertical">({
      base: "vertical",
      md: "horizontal",
    });
    const bgColor = useColorModeValue("white", "gray.700");
    const zoomFactor = 0.1;
  
    const onDrop = useCallback((acceptedFiles: any) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageSrc(reader.result as string)
      );
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
        const croppedImage = await CroppedImg(imageSrc, croppedAreaPixels);
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
  
    return (
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
                <SelecionarImagem getRootProps={getRootProps} getInputProps={getInputProps} />
              )}
              {imageSrc && (
                <CortarImagem
                  imageSrc={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  setCrop={setCrop}
                  handleZoomChange={handleZoomChange}
                  onCropComplete={onCropComplete}
                  showCroppedImage={showCroppedImage}
                />
              )}
            </Box>
          )}
  
          {croppedImage && (
            <SalvarImagem
              croppedImage={croppedImage}
              salvarImagem={salvarImagem}
              setSalvouImagem={setSalvouImagem}
              setImageSrc={setImageSrc}
              setCroppedImage={setCroppedImage}
              setActiveStep={setActiveStep}
            />
          )}
        </Flex>
      </Box>
    );
  };
  

  const TabelaImagens: React.FC<ITabelaImagens> = ({ imagens, onExcluir, setImagens }) => {
    const bgColor = useColorModeValue("white", "gray.700");
    const albumBgColor = useColorModeValue("gray.100", "gray.800");
  
    const savedIdentifier = localStorage.getItem("userIdentifier");
  
    // Definir itemsPerPage com base no tamanho da tela
    const itemsPerPage = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(imagens.length / (itemsPerPage || 1));
  
    const paginatedImagens = imagens.slice(
      (currentPage - 1) * (itemsPerPage || 1),
      currentPage * (itemsPerPage || 1)
    );
  
    const imagensFiltradas = paginatedImagens.filter(
      (imagem) => imagem.identificadorUser === savedIdentifier
    );
  
    useEffect(() => {
      if (currentPage > totalPages) {
        setCurrentPage(1);
      }
    }, [imagens, currentPage, totalPages]);

    return imagensFiltradas.length > 0 ? (
      <>
        <Box
          p={5}
          borderRadius="md"
          boxShadow="lg"
          bg={albumBgColor}
          maxW="1200px"
          mx="auto"
        >
          <Heading as="h2" size="lg" mb={5} textAlign="center">
            Álbum de Fotos
          </Heading>
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} display="flex" justifyContent="center">
            {paginatedImagens.map(
              (imagem, index) =>
                imagem.identificadorUser === savedIdentifier && (
                  <Box
                    key={index}
                    boxShadow="md"
                    p="4"
                    borderRadius="md"
                    bg={bgColor}
                    maxW={{ base: "240px", sm: "340px" }}
                    position="relative"
                  >
                    <Flex direction="column" align="center">
                      <Tooltip label="Excluir" aria-label="Excluir">
                        <Button
                          leftIcon={<FaTrashAlt />}
                          colorScheme="red"
                          onClick={() =>
                            onExcluir && onExcluir(imagem.id, setImagens, imagens)
                          }
                          pl="1.5rem"
                          fontSize="1.4rem"
                          position="absolute"
                          top="10px"
                          right="10px"
                          opacity={0.6}
                          _hover={{ opacity: 1 }}
                          transition="opacity 0.2s"
                        />
                      </Tooltip>
  
                      <ImageChakra
                        src={`http://127.0.0.1:8000/storage/images/${imagem.caminho_da_imagem}`}
                        alt={`Imagem ${index}`}
                        boxSize={{ base: "200px", sm: "300px" }}
                        objectFit="cover"
                        mt={1}
                      />
                    </Flex>
                  </Box>
                )
            )}
          </Grid>
        </Box>
  
        <Flex justify="center" mt={4}>
          <IconButton
            icon={<FaArrowLeft />}
            isDisabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            aria-label="Página Anterior"
          />
  
          <Text mx={4}>{`${currentPage} de ${totalPages}`}</Text>
  
          <IconButton
            icon={<FaArrowRight />}
            isDisabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            aria-label="Próxima Página"
          />
        </Flex>
      </>
    ) : (
      <></>
    );
  };
  //#endregion

  return (
    <UploadImagensContext.Provider
      value={{
        navigate,

        toast,

        savedIdentifier,

        isLoading,
        setIsLoading,

        onExcluir,

        EtapasUpload,
        TabelaImagens,
      }}
    >
      {children}
    </UploadImagensContext.Provider>
  );
};
/* Fim do Contexto */
