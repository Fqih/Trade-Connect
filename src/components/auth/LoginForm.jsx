import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import { validateLogin } from '../../utils/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    try {
      setLoginError('');
      await login(values.email, values.password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please check your credentials.');
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
  } = useForm(initialValues, validateLogin, handleSubmit);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-gray-600">
          Sign in to your Trade Connect account
        </p>
      </div>

      {loginError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {loginError}
        </div>
      )}

      <form onSubmit={submitForm} className="space-y-4">
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
          <div className="flex justify-end mt-1">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;