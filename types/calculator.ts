export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: 'groceries' | 'rental' | 'utilities' | 'transport' | 'healthcare' | 'entertainment' | 'custom';
}

export interface IncomeItem {
  id: string;
  name: string;
  amount: number;
  category: 'side-income' | 'investment' | 'freelance' | 'bonus' | 'custom';
}

export interface CalculatorState {
  salary: number;
  expenses: ExpenseItem[];
  additionalIncome: IncomeItem[];
  setSalary: (salary: number) => void;
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<ExpenseItem>) => void;
  deleteExpense: (id: string) => void;
  addIncome: (income: Omit<IncomeItem, 'id'>) => void;
  updateIncome: (id: string, income: Partial<IncomeItem>) => void;
  deleteIncome: (id: string) => void;
  getTotalExpenses: () => number;
  getTotalAdditionalIncome: () => number;
  getNetIncome: () => number;
}