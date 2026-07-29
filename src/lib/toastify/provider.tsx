"use client"

import { ToastContainer } from "react-toastify"
import type { ReactNode } from "react"

import "react-toastify/dist/ReactToastify.css"

type ToastifyProviderProps = {
  children: ReactNode
}

export function ToastifyProvider({ children }: ToastifyProviderProps) {
  return (
    <>
      <ToastContainer autoClose={5000} pauseOnHover position="top-right" />
      {children}
    </>
  )
}
