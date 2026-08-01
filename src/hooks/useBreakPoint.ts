import { useEffect, useState } from 'react';
export type BreakpointLabel = 'phone' | 'tablet' | 'desktop';
export interface BreakpointInfo {
  width: number;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: BreakpointLabel;
}
function getInfo(width: number): BreakpointInfo {
  const isPhone = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const breakpoint: BreakpointLabel = isPhone ? 'phone' : isTablet ? 'tablet' : 'desktop';
  return { width, isPhone, isTablet, isDesktop, breakpoint };
}
export function useBreakpoint(): BreakpointInfo {
  const [info, setInfo] = useState<BreakpointInfo>(() =>
    getInfo(typeof window !== 'undefined' ? window.innerWidth : 1024),
  );
  useEffect(() => {
    const update = () => setInfo(getInfo(window.innerWidth));
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(update);
      ro.observe(document.documentElement);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);
  return info;
}