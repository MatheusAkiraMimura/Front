import api from "./axios";

// Requisição para Criar um Novo Candidato
export const createCandidate = async (candidateData: any) => {
  const response = await api.post("/candidates", candidateData);
  return response.data;
};

// Requisição para Obter Todos os Candidatos
export const getAllCandidates = async () => {
  const response = await api.get("/candidates");
  return response.data;
};

// Requisição para Obter um Candidato pelo ID
export const getCandidateById = async (id: string) => {
  const response = await api.get(`/candidates/${id}`);
  return response.data;
};

// Requisição para Atualizar um Candidato
export const updateCandidate = async (id: string, candidateData: any) => {
  const response = await api.put(`/candidates/${id}`, candidateData);
  return response.data;
};

// Requisição para Deletar um Candidato
export const deleteCandidate = async (id: string) => {
  const response = await api.delete(`/candidates/${id}`);
  return response.data;
};

// Requisição para Gerar PDF de um Candidato
export const generateCandidatePdf = async (id: string) => {
  const response = await api.get(`/candidates/${id}/pdf`, {
    responseType: "blob", // Importante para lidar com o arquivo PDF
  });

  // Criar URL para o PDF e abrir em uma nova aba
  const pdfUrl = URL.createObjectURL(
    new Blob([response.data], { type: "application/pdf" })
  );
  window.open(pdfUrl);

  return response.data;
};
