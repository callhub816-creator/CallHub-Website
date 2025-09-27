import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Use Cases', href: '#use-cases' },
      { label: 'API Documentation', href: '#api' }
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Press', href: '#press' }
    ],
    support: [
      { label: 'Help Center', href: '/support' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Status', href: '#status' },
      { label: 'Community', href: '#community' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#facebook', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#twitter', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#linkedin', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: '#instagram', label: 'Instagram' }
  ];

  return (
    <footer className="bg-slate-900/50 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                CallHub.in
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your business with AI-powered call automation. Scale your outreach, improve engagement, and drive results with intelligent voicebot technology.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">support@callhub.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <span className="text-white font-semibold mb-4 block">Product</span>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <span className="text-white font-semibold mb-4 block">Company</span>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <span className="text-white font-semibold mb-4 block">Support</span>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <span className="text-white font-semibold mb-4 block">Legal</span>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} CallHub.in. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;