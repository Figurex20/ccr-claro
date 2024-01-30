import { saveInformationSite } from '@/interface/interfaces'
import { NextApiRequest } from 'next'
import { InformationSiteModel } from '../models/modelInformationSite'

export const createSites = async (req: NextApiRequest) => {
  req.body.every(async (site:saveInformationSite) => {
    const {
      siteID,
      siteIDLTE,
      mnemonico,
      noPlaca,
      name,
      direccion,
      provincia,
      canton,
      distrito,
      latitud,
      longitud,
      propietarioSite,
      categoria,
      idTorrero,
      tecnologia,
      medio,
      equipoTX,
      sitioOrigen,
      dependencias,
      nMedidor,
      companiaElectrica,
      conexionDefinitivaTempoal,
      aa,
      mg,
      capacidadKW,
      tanqueCombustibleLitros,
      bancoBateriasExterno,
      autonomiaTotalHoras,
      tipoTorre,
      alturaTorre,
      casetaContenedor,
      zona,
      zonaEricsson,
      supervisorRBS,
      supervisorEnergia,
      llaveOYM
    }:saveInformationSite = site

    const siteAlready = await InformationSiteModel.paginate({ mnemonico })
    if (siteAlready.docs.length === 0) {
      const siteInfor = new InformationSiteModel({
        siteID,
        siteIDLTE,
        mnemonico,
        noPlaca,
        name,
        direccion,
        provincia,
        canton,
        distrito,
        latitud,
        longitud,
        propietarioSite,
        categoria,
        idTorrero,
        tecnologia,
        medio,
        equipoTX,
        sitioOrigen,
        dependencias,
        nMedidor,
        companiaElectrica,
        conexionDefinitivaTempoal,
        aa,
        mg,
        capacidadKW,
        tanqueCombustibleLitros,
        bancoBateriasExterno,
        autonomiaTotalHoras,
        tipoTorre,
        alturaTorre,
        casetaContenedor,
        zona,
        zonaEricsson,
        supervisorRBS,
        supervisorEnergia,
        llaveOYM
      })
      await siteInfor.save()
    }
  })
}

export const updateSites = async (req: NextApiRequest) => {
  req.body.every(async (site:saveInformationSite) => {
    await InformationSiteModel.findOneAndUpdate({ mnemonico: site.mnemonico }, site, { new: true })
  })
}

export const deleteInformationSites = async (req: string) => {
  await InformationSiteModel.findByIdAndDelete(req)
}
