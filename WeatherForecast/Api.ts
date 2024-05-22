const API_KEY: string = 'd94bcd435b62a031771c35633f9f310a'
const URL: string = "https://api.openweathermap.org/data/2.5/forecast/daily"

// export const coordinates = (location) => `${URL}weather?q=${location}&appid=${API_KEY}`

export const getWeatherForecastUrl = (loc: string) => `${URL}?q=${loc}&units=metric&cnt=7&appid=${API_KEY}`
