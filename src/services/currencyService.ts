export async function getCurrencyRates(
  base: string
): Promise<{ [key: string]: number }> {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}currency`)
  if (!response.ok) {
    throw new Error('Ошибка получения курсов валют')
  }
  const data = await response.json()

  const currencies = ['USD', 'EUR', 'RUB']
  const rates: { [key: string]: number } = {}

  currencies.forEach((currency) => {
    if (currency === base) return

    const keyDirect = `${currency.toLowerCase()}-${base.toLowerCase()}`

    const keyReverse = `${base.toLowerCase()}-${currency.toLowerCase()}`

    if (data[keyDirect] !== undefined) {
      rates[currency] = data[keyDirect]
    } else if (data[keyReverse] !== undefined) {
      rates[currency] = 1 / data[keyReverse]
    } else {
      throw new Error(`Нет данных для валютной пары ${currency}-${base}`)
    }
  })

  return rates
}

export async function getConversionRate(
  from: string,
  to: string
): Promise<number> {
  if (from === to) return 1
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}currency`)
  if (!response.ok) {
    throw new Error('Ошибка получения курса конвертации')
  }
  const data = await response.json()

  const keyDirect = `${from.toLowerCase()}-${to.toLowerCase()}`
  const keyReverse = `${to.toLowerCase()}-${from.toLowerCase()}`

  if (data[keyDirect] !== undefined) {
    return data[keyDirect]
  } else if (data[keyReverse] !== undefined) {
    return 1 / data[keyReverse]
  } else {
    throw new Error('Курс конвертации не найден')
  }
}
