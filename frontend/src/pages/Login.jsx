import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const { data } = await authService.login(form);
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0e9f9f 0%, #14b8a6 40%, #0d9488 100%)' }}
    >
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 260" preserveAspectRatio="none">
          <path fill="rgba(0,0,0,0.08)" d="M0,160 C360,260 1080,60 1440,160 L1440,260 L0,260 Z" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 260" preserveAspectRatio="none">
          <path fill="rgba(0,0,0,0.05)" d="M0,200 C480,120 960,240 1440,180 L1440,260 L0,260 Z" />
        </svg>
        <div
          className="absolute top-0 right-0 w-[500px] h-[650px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative w-full max-w-sm animate-fade-in pt-4">
        <div className=" absolute top-0 left-1/2 -translate-x-1/2 z-20  " style={{ animationFillMode: 'forwards' }}>
          <div
            className="px-12 py-3 rounded-sm shadow-xl"
            style={{ background: 'rgba(20, 220, 200, 0.9)', backdropFilter: 'blur(10px)' }}
          >
            <span className="font-orbitron font-bold text-slate-800 text-sm tracking-[0.25em]">SIGN IN</span>
          </div>
        </div>

        <div
          className="rounded-xl rounded-tl-none p-8 shadow-2xl"
          style={{
            background: 'rgba(10, 18, 40, 0.92)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          }}
        >
          <div
            className="flex justify-center mb-6 mt-6 animate-slide-up stagger-1 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(20,184,166,0.12)', border: '2px solid rgba(20,184,166,0.35)' }}
              >
                <svg className="w-14 h-14 text-teal-400 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="animate-slide-up stagger-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <InputField
                name="email"
                type="email"
                placeholder="username"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                icon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                }
              />
            </div>

            <div className="animate-slide-up stagger-3 opacity-0 relative" style={{ animationFillMode: 'forwards' }}>
              <InputField
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-teal-400 transition-colors"
              >
                {showPassword
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                }
              </button>
            </div>

            <div
              className="flex items-center justify-between text-xs animate-slide-up stagger-4 opacity-0"
              style={{ animationFillMode: 'forwards' }}
            >
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-teal-400 transition-colors font-exo">
                <input type="checkbox" className="w-3 h-3 rounded accent-teal-500" />
                Remember me
              </label>
              <span className="text-teal-400 hover:text-teal-300 cursor-pointer transition-colors font-exo">
                Forgot your password?
              </span>
            </div>

            <div className="pt-2 animate-slide-up stagger-5 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <Button type="submit" loading={loading}>
                Login
              </Button>
            </div>
          </form>

          <p className="text-center text-xs text-slate-500 mt-5 font-exo">
            Don't have an account?{' '}
            <Link to="/register" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
