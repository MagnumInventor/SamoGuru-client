"use client"

export const redirectToFF = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/ff"
  }
}
