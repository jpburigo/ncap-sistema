import { create } from 'zustand'

export const useNCStore = create((set) => ({
  nonConformities: [],
  actionPlans: [],

  setNonConformities: (data) => set({ nonConformities: data }),
  setActionPlans: (data) => set({ actionPlans: data }),

  addNonConformity: (nc) => set((state) => ({
    nonConformities: [...state.nonConformities, nc]
  })),

  updateNonConformity: (id, data) => set((state) => ({
    nonConformities: state.nonConformities.map(nc => nc.id === id ? { ...nc, ...data } : nc)
  })),

  addActionPlan: (plan) => set((state) => ({
    actionPlans: [...state.actionPlans, plan]
  })),

  updateActionPlan: (id, data) => set((state) => ({
    actionPlans: state.actionPlans.map(plan => plan.id === id ? { ...plan, ...data } : plan)
  })),
}))
