type UserInfo = {
  email: string
  name?: string
}
export type BrevoPayloadType = {
  sender?: Partial<UserInfo>
  to?: UserInfo[]
  bcc?: UserInfo[]
  cc?: UserInfo[]
  subject?: string
  htmlContent?: string
  textContent?: string
  replyTo?: UserInfo
  attachment?: {
    url?: string
    content?: Blob
    name?: string
  }[]
  headers?: Record<string, string>
  templateId?: number
  params?: Record<string, string>
  tags?: string[]
  scheduledAt?: Date
}

export const BrevoError = {
  invalid_parameter:
    'The value of the parameter you have provided is not valid. Please check the format and the type',
  missing_parameter:
    'One of the required parameter is missing to perform the request',
  out_of_range:
    'The value of the parameter you have provided is not included in the authorized range',
  unauthorized: 'You are not authorized to do this call',
  reseller_permission_denied:
    'You need a reseller plan to perform this API call',
  document_not_found: 'The parameter value in brackets {} is not found',
  method_not_allowed:
    'The method you are requesting for this path is not allowed. (ex : you are doing put but only get method is allowed for the path)',
  not_enough_credits:
    "You don't have enough credit to perform the request. Example : you are trying to send a campaign but your plan has expired",
  duplicate_parameter: 'One of the parameters in the request already exists.',
  duplicate_request: 'The request rate of the very same request is too high',
  account_under_validation: 'Your account is under validation',
  permission_denied: "You don't have the permission to perform this request",
}
