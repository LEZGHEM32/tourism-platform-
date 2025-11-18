
import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useAppContext } from '../../hooks/useAppContext';
import { mockUsers } from '../../data/mock';
import { UserType } from '../../types';
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../common/Icons';

const AuthModal: React.FC = () => {
  const { state, dispatch, t } = useAppContext();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<UserType>(UserType.Tourist);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login by finding user in mock data
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'CLOSE_MODAL', payload: 'auth' });
      setEmail('');
      setPassword('');
    } else {
      alert('User not found!');
    }
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    const newUser = { id: Date.now(), name, email, type: userType };
    mockUsers.push(newUser); // In a real app, this would be an API call
    dispatch({ type: 'SET_USER', payload: newUser });
    dispatch({ type: 'CLOSE_MODAL', payload: 'auth' });
    setName('');
    setEmail('');
    setPassword('');
  }

  const InputField = ({
    label, 
    type, 
    value, 
    onChange, 
    icon: Icon,
    isPassword = false 
  }: {
    label: string, 
    type: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon?: React.FC<{className?: string}>,
    isPassword?: boolean
  }) => (
      <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
          <div className="relative">
              {Icon && (
                  <div className="absolute inset-y-0 left-0 pl-3 rtl:right-0 rtl:left-auto rtl:pr-3 flex items-center pointer-events-none">
                      <Icon className="h-5 w-5 text-gray-400" />
                  </div>
              )}
              <input
                  type={isPassword ? (showPassword ? 'text' : 'password') : type}
                  value={value}
                  onChange={onChange}
                  className={`w-full py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-all ${Icon ? 'pl-10 rtl:pr-10 rtl:pl-3' : 'px-3'}`}
                  required
              />
              {isPassword && (
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 rtl:left-0 rtl:right-auto rtl:pl-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                  >
                      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
              )}
          </div>
      </div>
  )

  const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.25 17.21 15.87 18.09V21.09H19.75C22.02 19.04 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
        <path d="M12 24C15.24 24 17.97 22.91 19.75 21.09L15.87 18.09C14.76 18.82 13.32 19.2 12 19.2C8.88 19.2 6.21 17.12 5.26 14.23H1.24V17.32C3.02 20.9 6.75 24 12 24Z" fill="#34A853"/>
        <path d="M5.26 14.23C5.01 13.45 4.88 12.75 4.88 12C4.88 11.25 5.01 10.56 5.26 9.77V6.69H1.24C0.44 8.28 0 10.08 0 12C0 13.92 0.44 15.72 1.24 17.32L5.26 14.23Z" fill="#FBBC05"/>
        <path d="M12 4.79C14.34 4.79 15.93 5.76 16.78 6.55L20.04 3.33C17.96 1.43 15.23 0 12 0C6.75 0 3.02 3.1 1.24 6.69L5.26 9.77C6.21 6.89 8.88 4.79 12 4.79Z" fill="#EA4335"/>
    </svg>
  );

  const SocialLogin = () => (
      <>
        <button type="button" className="w-full flex items-center justify-center py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 font-medium text-gray-700 dark:text-gray-200">
            <GoogleIcon />
            {t('continueWithGoogle')}
        </button>
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background-light dark:bg-background-dark text-gray-500">{t('or')}</span>
            </div>
        </div>
      </>
  );

  return (
    <Modal isOpen={state.modals.auth} onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: 'auth' })} title={isLoginView ? t('login') : t('signUp')}>
      {isLoginView ? (
        <div className="pt-2">
          <h3 className="text-2xl font-bold text-center mb-2 text-primary dark:text-primary-light">{t('marhaba')}</h3>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">{t('loginToYourAccount')}</p>
          
          <SocialLogin />

          <form onSubmit={handleLogin}>
            <InputField label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={MailIcon} />
            <InputField label={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={LockIcon} isPassword={true} />
            
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <input 
                        id="remember_me" 
                        type="checkbox" 
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        {t('rememberMe')}
                    </label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-dark hover:underline">
                        {t('forgotPassword')}
                    </a>
                </div>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              {t('login')}
            </button>
          </form>
          <div className="mt-6 text-center">
             <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('dontHaveAccount')}{' '}
                <button onClick={() => setIsLoginView(false)} className="text-primary hover:underline font-bold">
                  {t('signUp')}
                </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="pt-2">
           <h3 className="text-2xl font-bold text-center mb-2 text-primary dark:text-primary-light">{t('createAnAccount')}</h3>
           <p className="text-center text-gray-500 dark:text-gray-400 mb-6">{t('discoverAndBook')}</p>

           <SocialLogin />

          <form onSubmit={handleSignUp}>
            <InputField label={t('name')} type="text" value={name} onChange={(e) => setName(e.target.value)} icon={UserIcon} />
            <InputField label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={MailIcon} />
            <InputField label={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={LockIcon} isPassword={true} />
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('accountType')}</label>
              <div className="relative">
                  <select 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white appearance-none"
                  >
                    <option value={UserType.Tourist}>{t('tourist')}</option>
                    <option value={UserType.Provider}>{t('serviceProvider')}</option>
                  </select>
                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300 rtl:left-0 rtl:right-auto">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              {t('signUp')}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('alreadyHaveAccount')}{' '}
                <button onClick={() => setIsLoginView(true)} className="text-primary hover:underline font-bold">
                {t('login')}
                </button>
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
