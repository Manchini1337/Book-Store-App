const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'PLN',
  style: 'currency',
});

export const formatCurrency = (price) => {
  const newPrice = price / 100;
  return CURRENCY_FORMATTER.format(newPrice);
};
