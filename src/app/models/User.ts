export interface User {
  id: string,
  email: string,
  name: string,
  clientMqttPassword: string,
  approvedRegistration: boolean,
  profiles: any
}
