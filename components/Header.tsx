import React from 'react';

const FacebookIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8 bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-700 text-shadow">Math Trainer</h1>
      <p className="text-lg text-gray-500 mt-2">by ATMANE ZARKAOUI</p>
      <a
        href="https://www.facebook.com/profile.php?id=61553546210499&mibextid=rS40aB7S9Ucbxw6v"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#1877f2] text-white px-5 py-3 rounded-full font-semibold text-sm mt-4 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/30 hover:bg-[#166fe5] hover:-translate-y-0.5"
      >
        <FacebookIcon />
        Suivez-moi sur Facebook
      </a>
    </div>
  );
};

export default Header;