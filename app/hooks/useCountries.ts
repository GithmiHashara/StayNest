import countries from 'world-countries'

const formatedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag:`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`,
  latlng: country.latlng, // [latitude, longitude]
  region: country.region
}))

const useCountries = () => { //create hook
  const getAll = () => formatedCountries

  const getByValue = (value: string) => {
    return formatedCountries.find((country) => country.value === value)
  }

  return {
    getAll,
    getByValue
  }
}

export default useCountries

// Dynamic flag 
// URL: The flag URL now uses the cca2 field (which contains the 2-letter ISO code for each country) to dynamically construct 
// the flag URL: https://flagcdn.com/${country.cca2.toLowerCase()}.svg.

// Lowercasing: 
// .toLowerCase() ensures that the country code is in lowercase, which is required by the flag image service.