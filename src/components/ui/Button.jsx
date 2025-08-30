import React from "react";
export default function Button({ as='button', className='', children, variant='primary', size='lg', disabled=false, ...props }) {
  const Comp = as;
  const base = "inline-flex items-center justify-center rounded-2xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm:"px-3 py-2 text-sm", md:"px-4 py-2.5 text-sm", lg:"px-5 py-3 text-base", xl:"px-6 py-3.5 text-base" };
  const style = variant==='primary' ? { background:"var(--brand)", color:"#fff" }
    : variant==='danger' ? { background:"var(--danger)", color:"#fff" }
    : variant==='outline' ? { background:"#fff", border:"1px solid var(--border)", color:"var(--ink)" }
    : { background:"#fff", border:"1px solid var(--border)", color:"var(--ink)" };
  return <Comp disabled={disabled} className={`${base} ${sizes[size]} ${className}`} style={style} {...props}>{children}</Comp>;
}
