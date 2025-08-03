import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CalculatorState, ExpenseItem, IncomeItem } from "@/types/calculator";

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      salary: 0,
      expenses: [],
      additionalIncome: [],
      hasHydrated: false,

      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      setSalary: (salary: number) => set({ salary }),

      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            ...state.expenses,
            { ...expense, id: crypto.randomUUID() },
          ],
        })),

      updateExpense: (id, updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedExpense } : expense
          ),
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),

      addIncome: (income) =>
        set((state) => ({
          additionalIncome: [
            ...state.additionalIncome,
            { ...income, id: crypto.randomUUID() },
          ],
        })),

      updateIncome: (id, updatedIncome) =>
        set((state) => ({
          additionalIncome: state.additionalIncome.map((income) =>
            income.id === id ? { ...income, ...updatedIncome } : income
          ),
        })),

      deleteIncome: (id) =>
        set((state) => ({
          additionalIncome: state.additionalIncome.filter(
            (income) => income.id !== id
          ),
        })),

      getTotalExpenses: () => {
        const { expenses } = get();
        return expenses.reduce((total, expense) => total + expense.amount, 0);
      },

      getTotalAdditionalIncome: () => {
        const { additionalIncome } = get();
        return additionalIncome.reduce(
          (total, income) => total + income.amount,
          0
        );
      },

      getNetIncome: () => {
        const { salary, getTotalExpenses, getTotalAdditionalIncome } = get();
        return salary + getTotalAdditionalIncome() - getTotalExpenses();
      },
    }),
    {
      name: "salary-calculator-storage",
       onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
