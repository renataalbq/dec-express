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

export const nivel_format_small = (nivel: string) => {
    if (nivel === 'ENSINO_MEDIO') {
        return 'Ens. Méd.';
    }
    else if (nivel === 'ENSINO_FUNDAMENTAL_I') {
        return 'Ens. Fund. I'
    }
    else {
        return 'Ens. Fund. II'
    }
}