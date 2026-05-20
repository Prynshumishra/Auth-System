import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: '', dateOfBirth: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
    else {
      const dob = new Date(form.dateOfBirth);
      const age = (Date.now() - dob) / (365.25 * 24 * 60 * 60 * 1000);
      if (age < 13) errs.dateOfBirth = 'You must be at least 13 years old';
    }
    if (!form.email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const { data } = await authService.register(form);
      login(data.user, data.token);
      toast.success(`Welcome, ${data.user.name}! Account created successfully.`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen wave-bg relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)' }} />
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path fill="rgba(20,184,166,0.3)" d="M0,60 C480,140 960,0 1440,80 L1440,200 L0,200 Z" />
        </svg>
      </div>

      <div className="relative w-full max-w-sm animate-fade-in">
        <div className="flex justify-center mb-0 relative z-10">
          <div className="btn-teal px-10 py-3 rounded-t-2xl">
            <span className="font-orbitron font-bold text-white text-sm tracking-[0.15em]">REGISTER</span>
          </div>
        </div>

        <div className="glass-card rounded-3xl rounded-tl-none p-8 shadow-2xl shadow-black/50"
          style={{ border: '1px solid rgba(20, 184, 166, 0.25)' }}>

          <div className="flex justify-center mb-5 animate-slide-up stagger-1 opacity-0"
            style={{ animationFillMode: 'forwards' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center animate-float"
              style={{ background: 'rgba(15,23,42,0.8)', border: '2px solid rgba(20,184,166,0.3)' }}>
              <svg className="w-12 h-12 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="animate-slide-up stagger-1 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <InputField
                name="name"
                placeholder="full name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                icon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                }
              />
            </div>

            <div className="animate-slide-up stagger-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <InputField
                name="dateOfBirth"
                type="date"
                placeholder="date of birth"
                value={form.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
            </div>

            <div className="animate-slide-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <InputField
                name="email"
                type="email"
                placeholder="email address"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
            </div>

            <div className="animate-slide-up stagger-4 opacity-0 relative" style={{ animationFillMode: 'forwards' }}>
              <InputField
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="create password"
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

            <div className="pt-2 animate-slide-up stagger-5 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <Button type="submit" loading={loading}>
                Create Account
              </Button>
            </div>
          </form>

          <p className="text-center text-xs text-slate-500 mt-5 font-exo">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
