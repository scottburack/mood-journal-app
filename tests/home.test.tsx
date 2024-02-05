import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Homepage from '../app/page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => {
      resolve({userId: 'sampleId' })
    }),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Harris English',
      },
    })
  }
})

test('Home', async () => {
  render(await Homepage())
  expect(screen.getByText('get started')).toBeTruthy()
})