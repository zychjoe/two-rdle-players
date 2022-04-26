import {render} from '@testing-library/react'
import Modal from './Modal'

it('renders without crashing', () => {
  render(<Modal className="test" visible="true" text="Test" />)
})