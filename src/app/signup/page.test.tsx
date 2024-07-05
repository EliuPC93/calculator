import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Signup from './page'
 
test('Signup', () => {
  render(<Signup />)
  expect(screen.getByRole('heading', { level: 1, name: 'Sign Up' })).toBeDefined()
})