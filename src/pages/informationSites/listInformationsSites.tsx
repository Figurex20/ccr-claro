import { informationSiteController, selectInformationSite } from '@/slices/informationSites/informationSiteSlices'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { InformationSite } from '../../interface/interfaces'
import { CardInformationSite } from './cardInformationSite'
import { ModalCreateMoreInformationSites } from './modalCreateMoreInformationSites'
import Stack from 'react-bootstrap/Stack'
import { useEffect } from 'react'
import { ModalUpdatenformationSite } from './modalUpdatenformationSite'
import { DeleteInformacionSite } from './deleteInformacionSite'

export default function InformationSites () {
  const dispatch = useDispatch()
  const informationSites = useSelector(selectInformationSite)

  useEffect(() => {
    informationSiteController.fetchAllInformationSites(dispatch, 1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='m-5'>
      <Stack direction='horizontal' gap={5} className=''>
        <div className='col-lg-6 text-center'>
          <ModalCreateMoreInformationSites />
        </div>
        <div className='col-lg-6 text-center'>
          <ModalUpdatenformationSite />
        </div>
      </Stack>
      <Table
        responsive
        className='text-center border border-primary mb-5'
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        <thead>
          <tr>
            <th className='border border-success bg-secondary text-light '>Nonmbre</th>
            <th className='border border-success bg-secondary text-light '>ID del sitior</th>
            <th className='border border-success bg-secondary text-light '>ID LTE del sitio</th>
            <th className='border border-success bg-secondary text-light '>Mnemonico</th>
            <th className='border border-success bg-secondary text-light '>Direccion</th>
            <th className='border border-success bg-secondary text-light '>Provincia</th>
            <th className='border border-success bg-secondary text-light '>Canton</th>
            <th className='border border-success bg-secondary text-light '>Mas</th>
            <th className='border border-success bg-secondary text-light '>Eliminar</th>
          </tr>

        </thead>

        <tbody>
          {informationSites?.saveInformationSite.docs.map((site: InformationSite) => (
            <tr key={site._id} className='text-center fs-6'>
              <th className='border border-success'>{site.name}</th>
              <th className='border border-success'>{site.siteID}</th>
              <th className='border border-success'>{site.siteIDLTE}</th>
              <th className='border border-success'>{site.mnemonico}</th>
              <th className='border border-success'>{site.direccion}</th>
              <th className='border border-success'>{site.provincia}</th>
              <th className='border border-success'>{site.canton}</th>
              <th className='border border-success'><CardInformationSite {...site} /></th>
              <th className='border border-success'><DeleteInformacionSite {...site} /></th>
            </tr>))}
        </tbody>
      </Table>
    </div>
  )
}
