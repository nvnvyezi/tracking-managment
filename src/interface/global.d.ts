export type ICustomMenu = ICustomMenuItem[]

export interface ICustomMenuItem {
  key: string
  title: string
  icon: string
  auth?: boolean
  subs?: ICustomMenuItem[]
}
