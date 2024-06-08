import useSwr from 'swr'

// const url = "https://api.exchangerate-api.com/v4/latest/USD"
const url = "https://open.er-api.com/v6/latest/USD"

export const useCurrency = () => useSwr('/currency', async () => {
  return await (await fetch(url)).json()
});