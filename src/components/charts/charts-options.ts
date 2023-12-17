import { ITurma } from '@/model/ITurma';
import { toCapitalize } from '@/utils/capitalize-formatter';
import { nivel_format_small } from '@/utils/nivel-formatter';


export function prepareChartData(classes: ITurma[]) {
    const chartData = classes?.map(turma => ({
      x: `${turma.serie}º Ano ${toCapitalize(turma.turma)} ${nivel_format_small(turma.nivel)}`,
      y: turma?.listaAlunos?.length
    }));
  
    return [{
      color: "#002e92",
      name: "Turmas",
      data: chartData
    }];
}