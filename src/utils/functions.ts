export const compare = (x: string, y: string) => {
  return x.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").split('.').join("").trim().includes(y.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").split('.').join("").trim())
}