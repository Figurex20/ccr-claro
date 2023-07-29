import { Income } from '@/interface/interfaces'
import { selectValueIncomes } from '@/slices/incomes/incomesSlices'
import xlsx from 'json-as-xlsx'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function ImportDataExcel () {
  const listincomes = useSelector(selectValueIncomes)

  const dates = (date: string | undefined) => {
    if (date !== undefined) {
      const newDate = new Date(date)

      const day = `${newDate.toLocaleDateString('es-ES')} ${newDate.getHours()}:${newDate.getMinutes()}`

      // const day = new String(newDay.toString())

      return day.toString()
    } else {
      return 'No ha salido'
    }
  }

  const downloadFile = () => {
    const data = [
      {
        sheet: 'Ingresos',
        columns: [
          { label: 'Tec', value: 'Tec' }, // Top level data
          { label: 'Sitio', value: 'Sitio' }, // Custom format
          { label: 'Trabajo', value: 'Trabajo' }, // Run functionstom format
          { label: 'RDA', value: 'RDA' }, // Custom format
          { label: 'Entrada', value: 'Entrada' }, // Custom format
          { label: 'Salida', value: 'Salida' }, // Custom format
          { label: 'NomIngreso', value: 'NomIngreso' }, // Custom format
          { label: 'NomSalida', value: 'NomSalida' }, // Custom format
          { label: 'Coment', value: 'Coment' } // Custom format

        ],

        content: listincomes.saveIncomes.docs.map((income: Income) => {
          console.log(income.whatdo)
          return {
            Tec: income.name,
            Sitio: income.site,
            Trabajo: income.whatdo.toString(),
            RDA: income.rda,
            Entrada: dates(income.dateEnter),
            Salida: dates(income.dateExit),
            NomIngreso: income.nameEnter,
            NomSalida: income.nameExit ? income.nameExit!.toString() : 'No ha salido',
            Coment: income.comments
          }
        })
      }
    ]
    const settings = {
      fileName: 'MySpreadsheet'
    }

    console.log(data)

    xlsx(data, settings)
  }

  return (
    <div id='app'>
      <Button onClick={downloadFile}>Descargar datos</Button>

    </div>
  )
}
