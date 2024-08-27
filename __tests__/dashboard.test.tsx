import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FormProvider, useForm } from 'react-hook-form';
import CreateEvent from '@/components/pages-partial/dashboard';

describe('CreateEvent Component', () => {
  // Define the type for the children prop
  interface WrapperProps {
    children: ReactNode;
  }

  // Utility to wrap component with FormProvider
  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('should render the CreateEvent component', () => {
    render(
      <Wrapper>
        <CreateEvent />
      </Wrapper>
    );

    // Check if component elements are loaded
    expect(screen.getByLabelText(/Your Event Name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Select Date\(s\)\.\.\./i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Video/i)).toBeInTheDocument();
  });

  it('should display validation errors when form is submitted empty', async () => {
    render(
      <Wrapper>
        <CreateEvent />
      </Wrapper>
    );

    // Submit the form without filling anything
    fireEvent.click(screen.getByText(/Create event/i));

    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText(/Event name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Timezone is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Start Time is required/i)).toBeInTheDocument();
      expect(screen.getByText(/End Time is required/i)).toBeInTheDocument();
    });
  });

  it('should display an error for a short description', async () => {
    render(
      <Wrapper>
        <CreateEvent />
      </Wrapper>
    );

    // Fill in the event name
    fireEvent.input(screen.getByLabelText(/Your Event Name/i), {
      target: { value: 'Test Event' },
    });

    // Fill in a short description
    fireEvent.input(screen.getByLabelText(/Description/i), {
      target: { value: 'Short' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Create event/i));

    // Check for validation error messages
    await waitFor(() => {
      expect(
        screen.getByText(/Description must be at least 15 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it('should display an error for an invalid video URL', async () => {
    render(
      <Wrapper>
        <CreateEvent />
      </Wrapper>
    );

    // Fill in valid fields except for the video link
    fireEvent.input(screen.getByLabelText(/Your Event Name/i), {
      target: { value: 'Test Event' },
    });
    fireEvent.input(screen.getByLabelText(/Description/i), {
      target: { value: 'This is a valid description' },
    });
    fireEvent.input(screen.getByLabelText(/Video/i), {
      target: { value: 'invalid-url' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Create event/i));

    // Check for validation error messages
    await waitFor(() => {
      expect(
        screen.getByText(/Video link must be a valid HTTPS URL/i)
      ).toBeInTheDocument();
    });
  });

  it('should submit the form successfully with valid data', async () => {
    render(
      <Wrapper>
        <CreateEvent />
      </Wrapper>
    );

    // Fill in all required fields
    fireEvent.input(screen.getByLabelText(/Your Event Name/i), {
      target: { value: 'Test Event' },
    });
    fireEvent.input(screen.getByLabelText(/Description/i), {
      target: { value: 'This is a valid description that is long enough.' },
    });
    fireEvent.input(screen.getByLabelText(/Video/i), {
      target: { value: 'https://www.example.com' },
    });

    // Mock the date picker and time picker interactions
    // This will depend on how your custom DatePicker and TimePicker work
    fireEvent.click(screen.getByPlaceholderText(/Select Date\(s\)\.\.\./i));
    fireEvent.click(screen.getByText('10')); // Assuming you're selecting the 10th of the current month
    fireEvent.click(screen.getByText(/Create event/i));

    // Verify that no validation errors are displayed and the form is submitted
    await waitFor(() => {
      expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Emilia Gates/i)).toBeInTheDocument();
    });
  });
});
