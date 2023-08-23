import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import App from './App'
import React from 'react'

test('displays loading spinner and then renders map', async () => {
  render(<App />)

  // Check if the loading spinner is initially present
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

  // Wait for the loading spinner to be removed from the document
  await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'), {
    timeout: 1000 * 60,
  })

  // Check if the map is rendered after the data is fetched
  expect(screen.getByTestId('map')).toBeInTheDocument()
})
