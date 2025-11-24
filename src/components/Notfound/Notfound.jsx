import React from 'react'

export default function Notfound() {
 return (
    <div className="min-h-screen flex items-center justify-center p-5 ">
      
      <div className="relative w-full max-w-4xl p-10 rounded-xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-green-600/50">
        
        
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-green-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        
        <div className="relative z-10 text-center text-white">
          <h1 className="text-9xl font-extrabold tracking-widest text-green-600 drop-shadow-lg">
            404
          </h1>
          <div className="bg-green-600 text-sm px-2 py-1 inline-block rounded-full uppercase font-semibold tracking-wider mb-6 shadow-lg">
            Page Not Found
          </div>
          <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 dark:text-gray-400">
            We're sorry, the page you requested could not be found.
          </p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 text-sm font-medium leading-5 text-white transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700 shadow-xl hover:shadow-2xl"
          >
            Go to Home
          </a>
        </div>
      </div>

      
    </div>
  );
}
