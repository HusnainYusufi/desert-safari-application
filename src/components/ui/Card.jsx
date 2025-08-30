import React from "react";
export function Card({ className='', children }) { return <div className={`card ${className}`}>{children}</div>; }
export function CardHeader({ className='', children }) { return <div className={`px-5 pt-5 ${className}`}>{children}</div>; }
export function CardContent({ className='', children }) { return <div className={`px-5 pb-5 ${className}`}>{children}</div>; }
export function CardTitle({ className='', children }) { return <h3 className={`text-base font-semibold text-slate-900 ${className}`}>{children}</h3>; }
