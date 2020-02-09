export type ICustomMenu = ICustomMenuItem[]

export interface ICustomMenuItem {
  key: string
  title: string
  icon: string
  auth?: [number]
  subs?: ICustomMenuItem[]
}
