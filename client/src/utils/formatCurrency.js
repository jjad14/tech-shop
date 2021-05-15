const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
})
  
export default function formatMoney(pennies) {
  return formatter.format(pennies / 100)
}