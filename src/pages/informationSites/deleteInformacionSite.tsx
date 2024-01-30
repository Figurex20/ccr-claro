import { InformationSite } from '@/interface/interfaces'
import React from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { informationSiteController } from '@/slices/informationSites/informationSiteSlices'
import { useDispatch } from 'react-redux'

export const DeleteInformacionSite = (site:InformationSite) => {
  const { _id } = site
  const dispatch = useDispatch()
  const handleShow = async (data:any) => {
    Swal.fire({
      title: '¿Esta seguro de elminar el sitio?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await informationSiteController.deleteInformationSites(_id)
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El sitio ha sido eliminado.',
          icon: 'success'
        })
        informationSiteController.fetchAllInformationSites(dispatch, 1)
      }
    })
  }

  return (

    <Button variant='danger ' size='sm' className='mb-2 ms-5 me-5' onClick={handleShow}>
      Eliminar informacion del sitio
    </Button>

  )
}
