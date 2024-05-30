export const mascaraCelular = (valor: string) => {
    return valor
        .replace(/\D/g, '') // Remove tudo que não é dígito
        .replace(/^(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d{5})(\d{1,4})/, '$1-$2') // Coloca hífen após o quinto dígito
        .replace(/(-\d{4})\d+?$/, '$1'); // Mantém apenas os 9 dígitos após o DDD
};
