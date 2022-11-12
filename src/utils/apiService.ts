const API_URL = process.env.REACT_APP_API_URL as string

export const getCats = async () => {
  try {
    const data = await fetch(`${API_URL}search?limit=20&has_breeds=1`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY as string,
      },
    })
    const json = await data.json()
    return json
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getCat = async (id: string) => {
  try {
    const data = await fetch(`${API_URL}${id}`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY as string,
      },
    })
    const json = await data.json()
    return json
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
