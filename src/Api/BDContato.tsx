import api from "./axios";

export const BDCreateContato = async (crudData: any) => {
    const response = await api.post('/contato', crudData);
    return response.data;
  };
  
  export const BDGetAllContato = async () => {
    const response = await api.get(`/contato`);
    return response.data;
  };