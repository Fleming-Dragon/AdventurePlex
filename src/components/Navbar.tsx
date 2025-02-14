import { Menu, X, Activity, UserCircle } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Book Now", href: "/book" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-indigo-600"
            >
              <Activity className="h-8 w-8" />
              <span>AdventurePlex</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium ${
                  location.pathname === item.href
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Profile Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center text-gray-500 hover:text-gray-900"
              >
                <UserCircle className="h-6 w-6" />
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Your Bookings
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      // Add logout logic here
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium ${
                    location.pathname === item.href
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Profile Menu */}
              <div className="border-t border-gray-200 pt-4">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/bookings"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Your Bookings
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    // Add logout logic here
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
