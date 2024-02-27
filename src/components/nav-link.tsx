import { Link, LinkProps, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function NavLink(props: LinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className={cn(
        'flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary data-[current=true]:text-primary',
        'dark:text-muted-foreground dark:hover:text-foreground dark:data-[current=true]:text-foreground',
      )}
      {...props}
    />
  )
}
