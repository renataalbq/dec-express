export const nivel_format = (nivel: string) => {
    if (nivel === 'ENSINO_MEDIO') {
        return 'Ensino Médio';
    }
    else if (nivel === 'ENSINO_FUNDAMENTAL_I') {
        return 'Ensino Fundamental I'
    }
    else {
        return 'Ensino Fundamental II'
    }
}