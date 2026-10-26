import type { OrderRow, NewOrder, OrderHppItemRow, NewOrderHppItem } from '@/db/schema'

export type { OrderRow, NewOrder, OrderHppItemRow, NewOrderHppItem }

export type PaymentStatus = 'paid' | 'down_payment' | 'unpaid'
export type ProjectStatus = 'in_progress' | 'completed' | 'revision' | 'cancelled'
export type HppCategory = 'hosting' | 'domain' | 'freelancer' | 'license' | 'tools' | 'other'
export type ServiceCategory = 'website' | 'ads' | 'mobile' | 'custom'

export interface OrderWithHppBreakdown extends OrderRow {
  hppItems: OrderHppItemRow[]
}

export interface PeriodSummary {
  totalSellingPrice: number
  totalHpp: number
  totalNetProfit: number
  averageProfitMargin: number
  orderCount: number
}

export interface FinancialSummaryStats {
  currentMonth: PeriodSummary
  currentYear: PeriodSummary
  allTime: PeriodSummary
}

export interface InitialHppItemInput {
  category: HppCategory
  description: string
  amount: number
  notes?: string
}

export interface CreateOrderInput {
  clientName: string
  clientPhone: string
  clientCompany?: string
  serviceCategory: ServiceCategory
  packageName: string
  sellingPrice: number
  paymentStatus?: PaymentStatus
  paidAmount?: number
  projectStatus?: ProjectStatus
  orderDate?: string | Date
  notes?: string
  hppItems?: InitialHppItemInput[]
}

export interface UpdateHppItemInput {
  category?: HppCategory
  description?: string
  amount?: number
  notes?: string
}

export interface AddHppItemInput {
  category: HppCategory
  description: string
  amount: number
  notes?: string
}
