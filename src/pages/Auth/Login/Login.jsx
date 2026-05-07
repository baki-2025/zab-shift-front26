import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
        navigate(location?.state || '/')
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-6">
      <h3 className="text-3xl text-center font-semibold">Welcome back</h3>
      <p className="text-center mb-2">Please Login</p>

      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset space-y-2">

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Enter your email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input"
            placeholder="Enter your password"
          />
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500">Password must be 6 characters or longer</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>

        <p className="text-center mt-2">
          New to Zap Shift? <Link state={location.state} className="text-blue-500 underline" to="/register">Register</Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
