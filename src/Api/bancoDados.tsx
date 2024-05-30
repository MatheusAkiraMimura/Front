import api, { apiImagem }  from "./axios";

export const BDLogin = async (email: string, senha: string) => {
  const response = await api.post(`/api/Users/Login`, { email, senha});
  return response.data;
}

export const BDCadastro = async (nome: string, email: string, senha: string) => {
  const response = await api.post(`/api/Users/register`, { nome, email, senha});
  return response.data;
}

export const BDPerfil = async (id: any) => {
  const response = await api.get(`/api/Users/${id}`);
  return response.data;
}


export const BDPerfilAlterar = async (id: any, nome: string, email: string, senha: string) => {
  const response = await api.put(`/api/Users/update`, { id, nome, email, senha});
  return response.data;
}

// Imagens
export const BDImagens = async (id: any) => {
  const response = await api.get(`/UploadImagem/upload/get?id=${id}`);
  return response.data;
}

const getFileFromBlobUrl = async (blobUrl: any) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], "nome_do_arquivo.png", { type: "image/png" });
};

export const BDUploadImagem = async (blobUrl: any, idUser: any) => {
  const file = await getFileFromBlobUrl(blobUrl);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', idUser.toString());

  const response = await apiImagem.post('/UploadImagem/upload', formData);
  return response.data;
};


export const BDDeleteImagem = async (userId: any, imagemId: any) => {
  const response = await apiImagem.delete(`/UploadImagem/delete?userId=${userId}&imageId=${imagemId}`);
  return response.data;
};



// CRUD
// Cria um novo registro CRUD
export const BDCreateCRUD = async (crudData: any) => {
  const response = await api.post('/CRUD', crudData);
  return response.data;
};

// Obtém todos os registros CRUD relacionados com UserId
export const BDGetAllCRUDuserId = async (id: any) => {
  const response = await api.get(`/CRUD/getAllByUser?id=${id}`);
  return response.data;
};

// Obtém os dados do CRUD relacionados com UserId
export const BDGetByCrudId = async (id: any, idUser: any) => {
  const response = await api.get(`/CRUD/getById?id=${id}&idUser=${idUser}`);
  return response.data;
};


// Obtém os dados do CRUD relacionados com UserId
export const BDUpdateByCrudId = async (id: any, idUser: any, crudData: any) => {
  const response = await api.put(`/CRUD/alterarById?id=${id}&idUser=${idUser}`, crudData);
  return response.data;
};

// Obtém os dados do CRUD relacionados com UserId
export const BDDeleteByCrudId = async (id: any, idUser: any) => {
  const response = await api.delete(`/CRUD/deleteById?id=${id}&idUser=${idUser}`);
  return response.data;
};

// Valida a senha do CRUD
export const BDValidarSenha = async (id: any, idUser: any, senha: any) => {
  const response = await api.get(`/CRUD/validarSenha?id=${id}&idUser=${idUser}&inputPassword=${senha}`);
  return response.data;
};



