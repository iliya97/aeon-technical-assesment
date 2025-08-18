'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Challenge2() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureWord, setSecureWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Step 1: Submit username and get secure word
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/getSecureWord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSecureWord(data.secureWord);
        setCurrentStep(2);
      } else {
        setError(data.error || 'Failed to get secure word');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Proceed to password input
  const handleNextStep = () => {
    setCurrentStep(3);
  };

  // Step 3: Hash password and submit login
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Encrypt password before sending
      const encryptedPassword = await hashPassword(password);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username.trim(),
          encryptedPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginSuccess(true);
        setCurrentStep(4);
        
        // Clear navbar after successful login (as per Step 7 requirement)
        setTimeout(() => {
          // Redirect to Challenge 3 after successful login
          router.push('/challenge3');
        }, 2000);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setUsername('');
    setPassword('');
    setSecureWord('');
    setError('');
    setLoginSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar cleared after successful login */}
      {!loginSuccess && (
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button 
                  onClick={() => router.push('/')}
                  className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  ABTA
                </button>
              </div>
              <div className="text-sm text-gray-600">
                Challenge 2 - Login Flow
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {loginSuccess ? 'Login Successful!' : 'User Login'}
            </h1>
            <p className="text-gray-600">
              {loginSuccess 
                ? 'You have successfully logged in to the system.' 
                : `Step ${currentStep} of 3`
              }
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Username Input */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Your Username</h2>
              <form onSubmit={handleUsernameSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your username"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
                >
                  {loading ? 'Getting Secure Word...' : 'Get Secure Word'}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Display Secure Word */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Secure Word Retrieved</h2>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-700 font-medium">Username: {username}</p>
                </div>
                <p className="text-green-700 mt-2">
                  <span className="font-medium">Secure Word:</span> 
                  <span className="ml-2 font-mono bg-green-100 px-2 py-1 rounded text-sm">{secureWord}</span>
                </p>
              </div>
              <p className="text-gray-600 mb-6">
                Your secure word has been generated. Click "Next" to proceed to password entry.
              </p>
              <button
                onClick={handleNextStep}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 3: Password Input */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Your Password</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <p className="text-blue-700 text-sm">
                  <span className="font-medium">Username:</span> {username}
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  <span className="font-medium">Secure Word:</span> {secureWord}
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your password will be encrypted before transmission
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
                >
                  {loading ? 'Logging In...' : 'Login'}
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && loginSuccess && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Login Successful!</h2>
              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Username:</span> {username}
                </p>
                <p className="text-gray-700 text-sm mt-1">
                  <span className="font-medium">Login Time:</span> {new Date().toLocaleString()}
                </p>
                <p className="text-gray-700 text-sm mt-1">
                  <span className="font-medium">Status:</span> Password encrypted and verified
                </p>
              </div>
              <p className="text-gray-600 mb-6">
                You have successfully completed the login flow. The navbar has been cleared as requested.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
