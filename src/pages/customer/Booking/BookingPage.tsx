import { Container, Stepper, Step, StepLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import BookingStepService from './BookingStepService'
import BookingStepTime from './BookingStepTime'
import BookingStepConfirm from './BookingStepConfirm'
import { useBooking } from '../../../hooks/useBooking'

const steps = ['Dịch vụ', 'Thời gian', 'Xác nhận']

const BookingPage = () => {
  const booking = useBooking()
  const [step, setStep] = useState(0)
  useEffect(() => {
    console.log(
      '📦 Booking draft services:',
      booking.draft.services
    )
  }, [booking.draft.services])

  return (
    <Container sx={{ mt: 6 }}>
      <Stepper activeStep={step} sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {step === 0 && (
        <BookingStepService
          booking={booking}
          onNext={() => setStep(1)}
        />
      )}


      {step === 1 && (
        <BookingStepTime
          booking={booking}
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && (
        <BookingStepConfirm
          booking={booking}
          onBack={() => setStep(1)}
        />
      )}
    </Container>
  )
}

export default BookingPage
