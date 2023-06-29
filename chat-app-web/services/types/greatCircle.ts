export type GreatCircleParamType = {
  latitude1_deg: number
  longitude1_deg: number
  latitude2_deg: number
  longitude2_deg: number
}

export type GreatCircleType = GreatCircleParamType & {
  latitude1_rad: number
  longitude1_rad: number
  latitude2_rad: number
  longitude2_rad: number
  central_angle_rad: number
  central_angle_deg: number
  distance_kilometres: number
  valid: boolean
}
