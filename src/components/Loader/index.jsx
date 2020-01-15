import React from 'react'
import './styles.css';

export default function Loader({ loading, className }) {
  if(!loading) return null;
  return (
   <div className={className}>
      <div className="loader"></div>
   </div>
  )
}
