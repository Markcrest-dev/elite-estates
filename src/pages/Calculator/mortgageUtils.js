export function calcMonthly(price, downPct, annualRate, years) {
  const principal = price * (1 - downPct / 100);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function generateAmortization(price, downPct, annualRate, years) {
  const principal = price * (1 - downPct / 100);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const monthly = calcMonthly(price, downPct, annualRate, years);

  const schedule = [];
  let balance = principal;

  for (let year = 1; year <= years; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let month = 0; month < 12; month++) {
      const interestPayment = balance * r;
      const principalPayment = monthly - interestPayment;
      yearPrincipal += principalPayment;
      yearInterest += interestPayment;
      balance -= principalPayment;
    }

    schedule.push({
      year,
      principal: Math.round(yearPrincipal),
      interest: Math.round(yearInterest),
      balance: Math.max(0, Math.round(balance)),
    });
  }

  return schedule;
}
