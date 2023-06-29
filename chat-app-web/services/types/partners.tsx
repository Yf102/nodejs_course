export type PartnerType = {
  latitude: number
  longitude: number
  name: string
  partner_id: number
  distance?: number
}

export type PartnerApiType = PartnerType[]

export type PartnerCardType = {
  id: number
  name: string
  distance: number
}
