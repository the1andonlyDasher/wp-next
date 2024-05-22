import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentLabel = atom<any>("label_bottom_lime")
export const loc = atomWithStorage("location", "/")
export const scrollEnabled = atomWithStorage<any>("scroll", false)
export const currentItem = atom("")
export const load = atom(false)
export const cursor = atom<any>("default")
export const cursorText = atom<any>("default")