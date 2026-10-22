import { checkoutForSlug, checkoutPath } from '../config/checkout';

export type ProductPlanId = 'weekly' | 'monthly' | 'lifetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
  duration: string;
}

const aion2Plans: ProductPlan[] = [
  { id: 'weekly', label: 'Weekly', priceUsd: 15, priceNote: 'USD / week', duration: 'P7D' },
  { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: 'USD / month', duration: 'P30D' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · one-time', duration: 'P99Y' },
];

const dmaPlans: ProductPlan[] = [
  { id: 'weekly', label: 'Weekly', priceUsd: 15, priceNote: 'USD / week', duration: 'P7D' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 50, priceNote: 'USD · one-time', duration: 'P99Y' },
];

const hwidPlans: ProductPlan[] = [
  { id: 'weekly', label: 'Weekly', priceUsd: 15, priceNote: 'USD / week', duration: 'P7D' },
  { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: 'USD / month', duration: 'P30D' },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'dma') return dmaPlans;
  if (productSlug === 'hwid') return hwidPlans;
  return aion2Plans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, _planId?: ProductPlanId): string {
  if (baseUrl.includes('dma')) return checkoutPath('dma');
  if (baseUrl.includes('hwid')) return checkoutPath('hwid');
  return checkoutForSlug(baseUrl);
}
