import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1d21] text-gray-400 border-t border-gray-800 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/icon.png" alt="CA Monk Logo" className="w-10 h-10 rounded-lg" />
              <h2 className="heading-font text-lg sm:text-xl font-bold text-white">CA Monk</h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400 max-w-xs">
              Empowering the next generation of financial leaders with tools, community, and knowledge.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">Webinars</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Platform</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">Job Board</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">Practice Tests</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">Mentorship</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Connect</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-primary transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">© 2024 CA Monk. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-[10px] sm:text-xs text-gray-500 hover:text-primary transition-colors whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="text-[10px] sm:text-xs text-gray-500 hover:text-primary transition-colors whitespace-nowrap">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
