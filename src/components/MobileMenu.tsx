"use client";

import Link from "next/link"
import { X, ChevronRight, LogOut, User, LayoutDashboard, Car, MapPin, Info, Mail } from "lucide-react"
import { logoutAction } from "@/app/[lang]/actions/auth"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useTranslations } from "next-intl"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  user: any
  lang: string
}

export function MobileMenu({ isOpen, onClose, user, lang }: MobileMenuProps) {
  const t = useTranslations("nav")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[10000] md:hidden" style={{ transform: 'translateZ(0)' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={`absolute inset-0 h-[100dvh] w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link href={`/${lang}`} onClick={onClose} className="text-xl font-extrabold tracking-tight text-[var(--color-primary)]">
            Island Drive
          </Link>
          <button 
            onClick={onClose}
            className="p-3 bg-gray-50 rounded-2xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          
          {/* Main Links */}
          <div className="space-y-1">
            <MobileNavLink href={`/${lang}/fleet`} icon={<Car size={20} />} label={t("fleet")} onClick={onClose} />
            <MobileNavLink href={`/${lang}/locations`} icon={<MapPin size={20} />} label={t("locations")} onClick={onClose} />
            <MobileNavLink href={`/${lang}/about`} icon={<Info size={20} />} label={t("about")} onClick={onClose} />
            <MobileNavLink href={`/${lang}/contact`} icon={<Mail size={20} />} label={t("contact")} onClick={onClose} />
          </div>

          <div className="my-8 border-t border-gray-100 pt-8">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">
              {t("language")}
            </h4>
            <div className="px-4">
               <LanguageSwitcher />
            </div>
          </div>

          <div className="mt-auto border-t border-gray-100 pt-8 pb-8">
            {user ? (
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">
                  Account Details
                </h4>
                {user.role === "admin" && (
                  <MobileNavLink href={`/${lang}/admin`} icon={<LayoutDashboard size={20} />} label="Admin Panel" onClick={onClose} className="text-[var(--color-primary)]" />
                )}
                <MobileNavLink href={`/${lang}/profile`} icon={<User size={20} />} label={`${user.name || user.email}`} onClick={onClose} />
                <form action={logoutAction} className="mt-2">
                  <button
                    type="submit" 
                    className="w-full flex items-center justify-between py-4 px-5 rounded-2xl text-red-500 text-lg font-semibold hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3"><LogOut size={20} /> Logout</span>
                    <ChevronRight size={16} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex gap-3 px-2">
                <Link 
                  href={`/${lang}/login`} 
                  onClick={onClose}
                  className="flex-1 text-center py-4 rounded-2xl text-lg font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  Log in
                </Link>
                <Link 
                  href={`/${lang}/register`} 
                  onClick={onClose}
                  className="flex-1 btn-primary text-center !py-4 !text-lg"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileNavLink({ href, icon, label, onClick, className = "" }: { href: string; icon: React.ReactNode; label: string; onClick: () => void; className?: string }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center justify-between py-4 px-5 rounded-2xl text-gray-800 font-bold hover:bg-gray-50 transition-all text-lg ${className}`}
    >
      <span className="flex items-center gap-3">
        <span className="p-2 bg-gray-50 rounded-xl text-gray-500">
           {icon}
        </span>
        {label}
      </span>
      <ChevronRight size={18} className="text-gray-300" />
    </Link>
  )
}
