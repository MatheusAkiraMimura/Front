import api, { apiImagem }  from "./axios";

// Imagens
export const BDImagens = async () => {
  const response = await api.get(`/upload`);
  return response.data;
}

const getFileFromBlobUrl = async (blobUrl: any) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], "nome_do_arquivo.png", { type: "image/png" });
};

export const BDUploadImagem = async (blobUrl: any, identificadorUser: string) => {
  const file = await getFileFromBlobUrl(blobUrl);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('identificadorUser', identificadorUser);

  const response = await apiImagem.post(`/upload`, formData);
  return response.data;
};


export const BDDeleteImagem = async (imagemId: any) => {
  const response = await apiImagem.delete(`/upload/${imagemId}`);
  return response.data;
};



// CRUD
// Cria um novo registro CRUD
export const BDCreateCRUD = async (crudData: any) => {
  const response = await api.post('/crud', crudData);
  return response.data;
};

// Obtém todos os registros CRUD relacionados com UserId
export const BDGetAllCRUDuserId = async () => {
  const response = await api.get(`/crud`);
  return response.data;
};

// Obtém os dados do CRUD relacionados com UserId
export const BDGetByCrudId = async (id: any) => {
  const response = await api.get(`/crud/${id}`);
  return response.data;
};


// Obtém os dados do CRUD relacionados com UserId
export const BDUpdateByCrudId = async (id: any, crudData: any) => {
  const response = await api.put(`/crud/${id}`, crudData);
  return response.data;
};

// Obtém os dados do CRUD relacionados com UserId
export const BDDeleteByCrudId = async (id: any) => {
  const response = await api.delete(`/crud/${id}`);
  return response.data;
};