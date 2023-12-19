export const isValidEmail = (email: string) => {
    const regex = /^\w+@\w+\.\w+$/;
    return regex.test(email);
};

export const isValidCpf = (cpf: string) => {
    return cpf.length === 11;
}

export const isValidPhone = (telefone: string) => {
    return telefone.length > 11 || telefone.length < 12
}