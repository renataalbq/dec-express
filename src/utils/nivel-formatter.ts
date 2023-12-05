type Nivel = 'ENSINO_FUNDAMENTAL_I' | 'ENSINO_FUNDAMENTAL_II' | 'ENSINO_MEDIO';

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


export const seriesOptions: Record<Nivel, number[]> = {
  ENSINO_FUNDAMENTAL_I: [1, 2, 3, 4, 5, 6],
  ENSINO_FUNDAMENTAL_II: [7, 8, 9],
  ENSINO_MEDIO: [1, 2, 3],
};

export function isNivel(value: any): value is Nivel {
    return ['ENSINO_FUNDAMENTAL_I', 'ENSINO_FUNDAMENTAL_II', 'ENSINO_MEDIO'].includes(value);
}