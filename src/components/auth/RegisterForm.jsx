import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import { validateRegistration } from '../../utils/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [registerError, setRegisterError] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const handleSubmit = async (values) => {
    try {
      setRegisterError('');
      // Exclude confirmPassword and format data for API
      const { confirmPassword, ...userData } = values;
      await register(userData);
      
      // Set token in localStorage untuk simulasi autentikasi
      localStorage.setItem('token', 'sample-token-after-registration');
      
      toast.success('Registration successful');
      
      // Redirect ke dashboard langsung
      navigate('/dashboard');
    } catch (error) {
      setRegisterError(error.message || 'Registration failed. Please try again.');
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
  } = useForm(initialValues, validateRegistration, handleSubmit);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="mt-2 text-gray-600">
          Join Trade Connect to streamline your trading operations
        </p>
      </div>

      {registerError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {registerError}
        </div>
      )}

      <form onSubmit={submitForm} className="space-y-4">
        <div>
          <Input
            label="Full Name"
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            placeholder="John Smith"
            required
          />
        </div>

        <div>
          <Input
            label="Email address"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            placeholder="••••••••"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 8 characters and include a letter and a number
          </p>
        </div>

        <div>
          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && errors.confirmPassword}
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            checked={values.acceptTerms}
            onChange={handleChange}
            error={touched.acceptTerms && errors.acceptTerms}
            label={
              <>
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
              </>
            }
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;