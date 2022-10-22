export interface User {
  id: string,
  email: string,
  name: string,
  password: string,
  clientMqttPassword: string,
  approvedRegistration: boolean,
  profiles: any
}
