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
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { THEME_STORAGE_KEYS } from '@/lib/theme-storage'

// The inline script in index.html must apply the theme class before React
// mounts; Dark Reader checks `html.dark` only once while the page loads.
const html = readFileSync(
  resolve(import.meta.dirname, '../../../index.html'),
  'utf8'
)
const bootScript = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? ''
const progressScript =
  html.match(
    /<script id="app-loading-progress-script">([\s\S]*?)<\/script>/
  )?.[1] ?? ''
const entrySource = readFileSync(
  resolve(import.meta.dirname, '../../main.tsx'),
  'utf8'
)

function runBootScript() {
  new Function(bootScript)()
}

function mockSystemDarkMode(dark: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches: dark && query === '(prefers-color-scheme: dark)',
        media: query,
      }) as MediaQueryList
  )
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
  localStorage.clear()
  document.body.replaceChildren()
  document.documentElement.classList.remove('light', 'dark')
})

describe('index.html theme boot script', () => {
  it('shows an accessible estimated progress bar until the app mounts', () => {
    const page = new DOMParser().parseFromString(html, 'text/html')
    const status = page.querySelector('#root [data-app-loading]')
    const progress = status?.querySelector('[data-app-loading-progress]')

    expect(status?.getAttribute('role')).toBe('status')
    expect(status?.getAttribute('aria-live')).toBe('polite')
    expect(status?.textContent).toContain('正在加载页面 / Loading page')
    expect(progress?.getAttribute('role')).toBe('progressbar')
    expect(progress?.getAttribute('aria-valuenow')).toBe('0')
    expect(
      status?.querySelector('[data-app-loading-percent]')?.textContent
    ).toBe('~0%')
    expect(entrySource).toContain(
      "rootElement.querySelector('[data-app-loading]')"
    )
    expect(entrySource).toContain("new Event('newapi:app-ready')")
  })

  it('caps estimated progress until the app reports ready', () => {
    vi.useFakeTimers()
    document.body.innerHTML = new DOMParser().parseFromString(
      html,
      'text/html'
    ).body.innerHTML

    new Function(progressScript)()
    vi.advanceTimersByTime(60000)

    const progress = document.querySelector('[data-app-loading-progress]')
    const label = document.querySelector('[data-app-loading-percent]')
    expect(progress?.getAttribute('aria-valuenow')).toBe('90')
    expect(label?.textContent).toBe('~90%')

    window.dispatchEvent(new Event('newapi:app-ready'))

    expect(progress?.getAttribute('aria-valuenow')).toBe('100')
    expect(label?.textContent).toBe('~100%')
  })

  it('applies the saved dark preference to html before React mounts', () => {
    mockSystemDarkMode(false)
    localStorage.setItem(THEME_STORAGE_KEYS.mode, 'dark')

    runBootScript()

    expect(document.documentElement).toHaveClass('dark')
    expect(document.documentElement).not.toHaveClass('light')
  })

  it('applies the saved light preference even when the system is dark', () => {
    mockSystemDarkMode(true)
    localStorage.setItem(THEME_STORAGE_KEYS.mode, 'light')

    runBootScript()

    expect(document.documentElement).toHaveClass('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('follows the system dark mode when no preference is saved', () => {
    mockSystemDarkMode(true)

    runBootScript()

    expect(document.documentElement).toHaveClass('dark')
  })

  it('follows the system light mode when the saved value is invalid', () => {
    mockSystemDarkMode(false)
    localStorage.setItem(THEME_STORAGE_KEYS.mode, 'sepia')

    runBootScript()

    expect(document.documentElement).toHaveClass('light')
  })
})
