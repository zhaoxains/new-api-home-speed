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
import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import { useTopNavLinks } from './use-top-nav-links'

vi.mock('@/hooks/use-status', () => ({
  useStatus: () => ({
    status: {
      HeaderNavModules: JSON.stringify({
        home: true,
        console: true,
        pricing: true,
        rankings: true,
        docs: true,
        about: true,
      }),
      docs_link: 'https://docs.example.com',
    },
  }),
}))

afterEach(cleanup)

it('places the model degradation test link after Model Square as an external link', () => {
  const { result } = renderHook(() => useTopNavLinks())
  const links = result.current
  const modelSquareIndex = links.findIndex(
    (link) => link.title === 'Model Square'
  )

  expect(links[modelSquareIndex + 1]).toMatchObject({
    title: 'Model Degradation Test',
    href: 'https://cloud.aiqube.cn/',
    external: true,
  })
})
