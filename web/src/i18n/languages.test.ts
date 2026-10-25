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
import { describe, expect, test } from 'vitest'

import {
  convertDetectedLanguage,
  normalizeInterfaceLanguage,
} from './languages'

describe('convertDetectedLanguage', () => {
  test('maps all browser Chinese tags onto Simplified Chinese', () => {
    expect(convertDetectedLanguage('zh-TW')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-HK')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-MO')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-Hant-TW')).toBe('zhCN')
    expect(convertDetectedLanguage('zh')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-CN')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-Hans')).toBe('zhCN')
  })

  test('keeps supported language codes stable in localStorage', () => {
    expect(convertDetectedLanguage('zhCN')).toBe('zhCN')
    expect(convertDetectedLanguage('en')).toBe('en')
  })

  test('falls back to English for unsupported browser languages', () => {
    expect(convertDetectedLanguage('fr-FR')).toBe('en')
    expect(convertDetectedLanguage('ja')).toBe('en')
    expect(convertDetectedLanguage('vi')).toBe('en')
  })
})

describe('normalizeInterfaceLanguage', () => {
  test('normalizes supported and regional language codes', () => {
    expect(normalizeInterfaceLanguage('zh-CN')).toBe('zhCN')
    expect(normalizeInterfaceLanguage('zh-TW')).toBe('zhCN')
    expect(normalizeInterfaceLanguage('en-US')).toBe('en')
  })

  test('falls back to English for unsupported languages', () => {
    expect(normalizeInterfaceLanguage('fr')).toBe('en')
    expect(normalizeInterfaceLanguage('')).toBe('en')
  })
})
