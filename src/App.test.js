import { render, screen } from '@testing-library/react'
import App from './App'

it('renders without crashing', () => {
  render(<App />)
})

test('renders w/ title', () => {
  render(<App />)
  const linkElement = screen.getByText(/player/i)
  expect(linkElement).toBeInTheDocument()
})


