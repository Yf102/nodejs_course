import { PartnerApiType } from 'services/types/partners'

export type ContactsFormInput = {
  latitude?: number
  longitude?: number
}

export type IndexProps = {
  partners: PartnerApiType
}

export type MainLocation = {
  name: string
  latitude: number
  longitude: number
}
