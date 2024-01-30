import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { InformationSite } from '../../interface/interfaces'
export const CardInformationSite = (site:InformationSite) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='info ' size='sm' className='mb-2 btn btn-primary ms-5 me-5' onClick={handleShow}>
        Toda la informacion del sitio
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className=''>
          <Modal.Title>Informacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>

            <tr>
              <th className='border border-secondary '>name:</th>
              <th className='border border-secondary'>{site.name}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>siteID:</th>
              <th className='border border-secondary'>{site.siteID}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>siteIDLTE:</th>
              <th className='border border-secondary'>{site.siteIDLTE}</th>

            </tr>

            <tr>
              <th className='border border-secondary'>mnemonico:</th>
              <th className='border border-secondary'>{site.mnemonico}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>direccion:</th>
              <th className='border border-secondary'>{site.direccion}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>provincia:</th>
              <th className='border border-secondary'>{site.provincia}</th>
            </tr>

            <tr>

              <th className='border border-secondary'>distrito:</th>
              <th className='border border-secondary'>{site.distrito}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>latitud:</th>
              <th className='border border-secondary'>{site.latitud}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>longitud:</th>
              <th className='border border-secondary'>{site.longitud}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>categoria:</th>
              <th className='border border-secondary'>{site.categoria}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>idTorrero:</th>
              <th className='border border-secondary'>{site.idTorrero}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>tecnologia:</th>
              <th className='border border-secondary'>{site.tecnologia}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>medio</th>
              <th className='border border-secondary'>{site.medio}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>equipoTX</th>
              <th className='border border-secondary'>{site.equipoTX}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>sitioOrigen</th>
              <th className='border border-secondary'>{site.sitioOrigen}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>dependencias</th>
              <th className='border border-secondary'>{site.dependencias}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>nMedidor</th>
              <th className='border border-secondary'>{site.nMedidor}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>companiaElectrica</th>
              <th className='border border-secondary'>{site.companiaElectrica}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>conexionDefinitivaTempoal</th>
              <th className='border border-secondary'>{site.conexionDefinitivaTempoal}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>mg</th>
              <th className='border border-secondary'>{site.mg}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>capacidadKW</th>
              <th className='border border-secondary'>{site.capacidadKW}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>tanqueCombustibleLitros</th>
              <th className='border border-secondary'>{site.tanqueCombustibleLitros}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>bancoBateriasExterno</th>
              <th className='border border-secondary'>{site.bancoBateriasExterno}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>autonomiaTotalHoras</th>
              <th className='border border-secondary'>{site.autonomiaTotalHoras}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>tipoTorre</th>
              <th className='border border-secondary'>{site.tipoTorre}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>alturaTorre</th>
              <th className='border border-secondary'>{site.alturaTorre}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>casetaContenedor</th>
              <th className='border border-secondary'>{site.casetaContenedor}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>zona</th>
              <th className='border border-secondary'>{site.zona}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>zonaEricsson</th>
              <th className='border border-secondary'>{site.zonaEricsson}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>supervisorRBS</th>
              <th className='border border-secondary'>{site.supervisorRBS}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>supervisorEnergia</th>
              <th className='border border-secondary'>{site.supervisorEnergia}</th>
            </tr>

            <tr>
              <th className='border border-secondary'>llaveOYM</th>
              <th className='border border-secondary'>{site.llaveOYM}</th>
            </tr>

          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
