/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
export const AUTH_SECTION = {
  basicAuth: 'basic-auth',
  oauth: 'oauth',
  passkey: 'passkey',
  botProtection: 'bot-protection',
  customOAuth: 'custom-oauth',
} as const

export const AUTH_SECTION_IDS = [
  AUTH_SECTION.basicAuth,
  AUTH_SECTION.oauth,
  AUTH_SECTION.passkey,
  AUTH_SECTION.botProtection,
  AUTH_SECTION.customOAuth,
] as const
export const AUTH_DEFAULT_SECTION = AUTH_SECTION.basicAuth

export const BILLING_SECTION = {
  quota: 'quota',
  currency: 'currency',
  modelPricing: 'model-pricing',
  groupPricing: 'group-pricing',
  payment: 'payment',
  checkin: 'checkin',
} as const

export const BILLING_SECTION_IDS = [
  BILLING_SECTION.quota,
  BILLING_SECTION.currency,
  BILLING_SECTION.modelPricing,
  BILLING_SECTION.groupPricing,
  BILLING_SECTION.payment,
  BILLING_SECTION.checkin,
] as const
export const BILLING_DEFAULT_SECTION = BILLING_SECTION.quota

export const CONTENT_SECTION = {
  dashboard: 'dashboard',
  announcements: 'announcements',
  apiInfo: 'api-info',
  faq: 'faq',
  uptimeKuma: 'uptime-kuma',
  chat: 'chat',
  drawing: 'drawing',
} as const

export const CONTENT_SECTION_IDS = [
  CONTENT_SECTION.dashboard,
  CONTENT_SECTION.announcements,
  CONTENT_SECTION.apiInfo,
  CONTENT_SECTION.faq,
  CONTENT_SECTION.uptimeKuma,
  CONTENT_SECTION.chat,
  CONTENT_SECTION.drawing,
] as const
export const CONTENT_DEFAULT_SECTION = CONTENT_SECTION.dashboard

export const MODELS_SECTION = {
  global: 'global',
  gemini: 'gemini',
  claude: 'claude',
  grok: 'grok',
  modelDeployment: 'model-deployment',
} as const

export const MODELS_SECTION_IDS = [
  MODELS_SECTION.global,
  MODELS_SECTION.gemini,
  MODELS_SECTION.claude,
  MODELS_SECTION.grok,
  MODELS_SECTION.modelDeployment,
] as const
export const MODELS_DEFAULT_SECTION = MODELS_SECTION.global

export const OPERATIONS_SECTION = {
  behavior: 'behavior',
  alerts: 'alerts',
  email: 'email',
  worker: 'worker',
  logs: 'logs',
  performance: 'performance',
  updateChecker: 'update-checker',
} as const

export const OPERATIONS_SECTION_IDS = [
  OPERATIONS_SECTION.behavior,
  OPERATIONS_SECTION.alerts,
  OPERATIONS_SECTION.email,
  OPERATIONS_SECTION.worker,
  OPERATIONS_SECTION.logs,
  OPERATIONS_SECTION.performance,
  OPERATIONS_SECTION.updateChecker,
] as const
export const OPERATIONS_DEFAULT_SECTION = OPERATIONS_SECTION.behavior

export const POLICY_SECTION = {
  filtering: 'filtering',
  routing: 'routing',
  health: 'health',
} as const
export const POLICY_SECTION_IDS = [
  POLICY_SECTION.filtering,
  POLICY_SECTION.routing,
  POLICY_SECTION.health,
] as const
export const POLICY_DEFAULT_SECTION = POLICY_SECTION.routing

export const SECURITY_SECTION = {
  rateLimit: 'rate-limit',
  ssrf: 'ssrf',
  tokenLimits: 'token-limits',
} as const
export const SECURITY_SECTION_IDS = [
  SECURITY_SECTION.rateLimit,
  SECURITY_SECTION.ssrf,
  SECURITY_SECTION.tokenLimits,
] as const
export const SECURITY_DEFAULT_SECTION = SECURITY_SECTION.rateLimit

export const SITE_SECTION = {
  systemInfo: 'system-info',
  notice: 'notice',
  headerNavigation: 'header-navigation',
  sidebarModules: 'sidebar-modules',
} as const
export const SITE_SECTION_IDS = [
  SITE_SECTION.systemInfo,
  SITE_SECTION.notice,
  SITE_SECTION.headerNavigation,
  SITE_SECTION.sidebarModules,
] as const
export const SITE_DEFAULT_SECTION = SITE_SECTION.systemInfo
