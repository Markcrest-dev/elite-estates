import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import LoanInputs from './LoanInputs';
import ResultsSummary from './ResultsSummary';
import AmortizationChart from './AmortizationChart';
import AmortizationTable from './AmortizationTable';
import { calcMonthly, generateAmortization } from './mortgageUtils';

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState({
    price: 2000000,
    downPct: 20,
    rate: 6.5,
    term: 30,
  });

  const monthly = useMemo(() => calcMonthly(inputs.price, inputs.downPct, inputs.rate, inputs.term), [inputs]);
  const schedule = useMemo(() => generateAmortization(inputs.price, inputs.downPct, inputs.rate, inputs.term), [inputs]);

  const loanAmount = inputs.price * (1 - inputs.downPct / 100);
  const totalInterest = schedule.reduce((sum, y) => sum + y.interest, 0);
  const totalCost = loanAmount + totalInterest;

  // Estimated tax and insurance for the donut chart
  const monthlyTax = (inputs.price * 0.012) / 12;
  const monthlyInsurance = (inputs.price * 0.003) / 12;
  const monthlyPrincipalInterest = monthly;
  const principalPortion = monthly - (loanAmount * (inputs.rate / 100 / 12));
  const interestPortion = monthly - principalPortion;

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Financial Tools</span>
            <div className="mt-3 w-12 h-[1px] bg-gold mx-auto" />
            <h1 className="mt-6 font-serif text-4xl md:text-5xl font-light text-estate-cream">
              Mortgage <span className="italic text-gold-light">Calculator</span>
            </h1>
            <p className="mt-4 text-estate-muted font-sans max-w-xl mx-auto">
              Plan your investment with precision. Adjust the parameters below to see real-time payment estimates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <LoanInputs inputs={inputs} setInputs={setInputs} />
            <ResultsSummary
              monthly={monthly}
              loanAmount={loanAmount}
              totalInterest={totalInterest}
              totalCost={totalCost}
              principalPortion={principalPortion}
              interestPortion={interestPortion}
              monthlyTax={monthlyTax}
              monthlyInsurance={monthlyInsurance}
            />
          </div>

          <div className="mt-16">
            <AmortizationChart schedule={schedule} />
          </div>

          <div className="mt-12">
            <AmortizationTable schedule={schedule} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
