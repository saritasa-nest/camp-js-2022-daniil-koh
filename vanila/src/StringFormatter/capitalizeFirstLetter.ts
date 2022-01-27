export const capitalizeFirstLetter = ( stringVar: string, locale:string = navigator.language) =>{
  const [first, ...rest  ] = stringVar
  return first.toLocaleUpperCase(locale) + rest.join('')
}
