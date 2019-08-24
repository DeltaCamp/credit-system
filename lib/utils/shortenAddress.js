const expression = /^(\w{8})\w*(\w{6})$/

export function shortenAddress(address) {
  let result

  if (!address) { return null }

  result = expression.exec(address)

  return `${result[1]}...${result[2]}`
}