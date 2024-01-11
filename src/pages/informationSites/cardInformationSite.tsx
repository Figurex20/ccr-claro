import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { InformationSite } from '../../interface/interfaces'
export const CardInformationSite = (site:InformationSite) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='primary ' size='lg' className='mb-2 btn btn-primary ms-5 me-5' onClick={handleShow}>
        Toda la informacion del sitio
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className=''>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>

            <tr>
              <th className='border border-success'>name:</th>
              <th className='border border-success'>{site.name}</th>
            </tr>

            <tr>
              <th className='border border-success'>nameEnter:</th>
              <th className='border border-success'>{site.nameEnter}</th>
            </tr>

            <tr>
              <th className='border border-success'>siteID:</th>
              <th className='border border-success'>{site.siteID}</th>
            </tr>

            <tr>
              <th className='border border-success'>siteIDLTE:</th>
              <th className='border border-success'>{site.siteIDLTE}</th>

            </tr>

            <tr>
              <th className='border border-success'>mnemonico:</th>
              <th className='border border-success'>{site.mnemonico}</th>
            </tr>

            <tr>
              <th className='border border-success'>noPlaca:</th>
              <th className='border border-success'>{site.noPlaca}</th>
            </tr>

            <tr>
              <th className='border border-success'>direccion:</th>
              <th className='border border-success'>{site.direccion}</th>
            </tr>

            <tr>
              <th className='border border-success'>provincia:</th>
              <th className='border border-success'>{site.provincia}</th>
            </tr>

            <tr>

              <th className='border border-success'>distrito:</th>
              <th className='border border-success'>{site.distrito}</th>
            </tr>

            <tr>
              <th className='border border-success'>latitud:</th>
              <th className='border border-success'>{site.latitud}</th>
            </tr>

            <tr>
              <th className='border border-success'>longitud:</th>
              <th className='border border-success'>{site.longitud}</th>
            </tr>

            <tr>
              <th className='border border-success'>categoria:</th>
              <th className='border border-success'>{site.categoria}</th>
            </tr>

            <tr>
              <th className='border border-success'>idTorrero:</th>
              <th className='border border-success'>{site.idTorrero}</th>
            </tr>

            <tr>
              <th className='border border-success'>tecnologia:</th>
              <th className='border border-success'>{site.tecnologia}</th>
            </tr>

            <tr>
              <th className='border border-success'>medio</th>
              <th className='border border-success'>{site.medio}</th>
            </tr>

            <tr>
              <th className='border border-success'>equipoTX</th>
              <th className='border border-success'>{site.equipoTX}</th>
            </tr>

            <tr>
              <th className='border border-success'>sitioOrigen</th>
              <th className='border border-success'>{site.sitioOrigen}</th>
            </tr>

            <tr>
              <th className='border border-success'>dependencias</th>
              <th className='border border-success'>{site.dependencias}</th>
            </tr>

            <tr>
              <th className='border border-success'>nMedidor</th>
              <th className='border border-success'>{site.nMedidor}</th>
            </tr>

            <tr>
              <th className='border border-success'>companiaElectrica</th>
              <th className='border border-success'>{site.companiaElectrica}</th>
            </tr>

            <tr>
              <th className='border border-success'>conexionDefinitivaTempoal</th>
              <th className='border border-success'>{site.conexionDefinitivaTempoal}</th>
            </tr>

            <tr>
              <th className='border border-success'>mg</th>
              <th className='border border-success'>{site.mg}</th>
            </tr>

            <tr>
              <th className='border border-success'>capacidadKW</th>
              <th className='border border-success'>{site.capacidadKW}</th>
            </tr>

            <tr>
              <th className='border border-success'>tanqueCombustibleLitros</th>
              <th className='border border-success'>{site.tanqueCombustibleLitros}</th>
            </tr>

            <tr>
              <th className='border border-success'>bancoBateriasExterno</th>
              <th className='border border-success'>{site.bancoBateriasExterno}</th>
            </tr>

            <tr>
              <th className='border border-success'>autonomiaTotalHoras</th>
              <th className='border border-success'>{site.autonomiaTotalHoras}</th>
            </tr>

            <tr>
              <th className='border border-success'>tipoTorre</th>
              <th className='border border-success'>{site.tipoTorre}</th>
            </tr>

            <tr>
              <th className='border border-success'>alturaTorre</th>
              <th className='border border-success'>{site.alturaTorre}</th>
            </tr>

            <tr>
              <th className='border border-success'>casetaContenedor</th>
              <th className='border border-success'>{site.casetaContenedor}</th>
            </tr>

            <tr>
              <th className='border border-success'>zona</th>
              <th className='border border-success'>{site.zona}</th>
            </tr>

            <tr>
              <th className='border border-success'>zonaEricsson</th>
              <th className='border border-success'>{site.zonaEricsson}</th>
            </tr>

            <tr>
              <th className='border border-success'>supervisorRBS</th>
              <th className='border border-success'>{site.supervisorRBS}</th>
            </tr>

            <tr>
              <th className='border border-success'>supervisorEnergia</th>
              <th className='border border-success'>{site.supervisorEnergia}</th>
            </tr>

            <tr>
              <th className='border border-success'>llaveOYM</th>
              <th className='border border-success'>{site.llaveOYM}</th>
            </tr>

          </Table>
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
    </>
  )
}
