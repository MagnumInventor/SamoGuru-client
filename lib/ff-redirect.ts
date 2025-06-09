"use client"

export const redirectToFF = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/ff"
  }
}

export const FFButton = ({ children, className = "", ...props }: any) => {
  return (
    <button className={`${className} cursor-pointer`} onClick={redirectToFF} {...props}>
      {children}
    </button>
  )
}
