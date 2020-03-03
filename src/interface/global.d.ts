export type ICustomMenu = ICustomMenuItem[]

export interface ICustomMenuItem {
  key: string
  title: string
  Icon?: React.ReactNode
  auth?: boolean
  subs?: ICustomMenuItem[]
}
