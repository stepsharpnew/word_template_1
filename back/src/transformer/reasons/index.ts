// back/src/transformer/reasons/index.ts
export interface Reason {
  id: number
  text: string
  description: string
}

const reasons: Reason[] = [
  {
    id: 1,
    text: "В соответствии с п.1 ст. 716 ГК РФ ...",
    description: ""
  },
  {
    id: 2,
    text: "Принимая во внимание вышеизложенное ...",
    description: ""
  }
]

export default reasons
