import { InformationSite } from '@/interface/interfaces'
// import { informationSiteController } from '@/slices/informationSites/informationSiteSlices'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
// import { InformationSite } from '../../interface/interfaces'
import * as XLSX from 'xlsx'
export const ModalCreateMoreInformationSites = () => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors }
  } = useForm<any>()

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // onchange states
  const [excelFile, setExcelFile] = useState<any>(null)
  const [typeError, setTypeError] = useState<any>(null)

  // submit state
  const [excelData, setExcelData] = useState<any>(null)

  const handleFile = (e:any) => {
    const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv']
    console.log('e: ', e)
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null)
        const reader = new FileReader()
        reader.readAsArrayBuffer(selectedFile)
        reader.onload = (e) => {
          setExcelFile(e.target!.result)
        }
      } else {
        setTypeError('Please select only excel file types')
        setExcelFile(null)
      }
    } else {
      console.log('Please select your file')
    }
  }

  const onSubmit: SubmitHandler<InformationSite> = async (data:any) => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' })
      const worksheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetName]
      const data = XLSX.utils.sheet_to_json(worksheet)
      console.log('data: ', data)
      setExcelData(data.slice(0, 10))
    }

    // try {
    //   const success = await informationSiteController.createInformationSite(excelData)
    //   if (success) {
    //     reset()
    //     return
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <>

      <Button variant='primary ' size='lg' className='mb-2 btn btn-primary ms-5 me-5' onClick={handleShow}>
        Crear multiples sitios
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='file'
                placeholder='Enter file'
                {...register('file', { required: true, onChange: (e) => { handleFile(e) } })}
              />
              <button type='submit' className='btn btn-success btn-md'>UPLOAD</button>
            </Form.Group>
            {errors.file && <h5>El archivo es requerido</h5>}
            {typeError && (
              <div className='alert alert-danger' role='alert'>{typeError}</div>
            )}
            <Button className='col-md-12' variant='primary' type='submit' id='submit'>
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* view data */}
      {/* <div className='viewer'>
        {excelData
          ? (
            <div className='table-responsive'>
              <table className='table'>

                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {excelData.map((individualExcelData, index) => (
                    <tr key={index}>
                      {Object.keys(individualExcelData).map((key) => (
                        <td key={key}>{individualExcelData[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
            )
          : (
            <div>No File is uploaded yet!</div>
            )}
      </div> */}
    </>
  )
}
