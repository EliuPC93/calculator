import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Login from './page'
 
test('Login', () => {
  render(<Login />)
  expect(screen.getByRole('heading', { level: 1, name: 'Sign in' })).toBeDefined()
})