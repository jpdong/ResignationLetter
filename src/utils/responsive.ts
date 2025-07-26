export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

export const getOptimalFontSize = (baseSize: number): number => {
  if (isMobile()) {
    return Math.max(baseSize * 0.9, 14); // Minimum 14px on mobile
  }
  return baseSize;
};

export const getOptimalPadding = (basePadding: number): number => {
  if (isMobile()) {
    return basePadding * 0.75; // Reduce padding on mobile
  }
  return basePadding;
};

export const getOptimalMargin = (baseMargin: number): number => {
  if (isMobile()) {
    return baseMargin * 0.8; // Reduce margin on mobile
  }
  return baseMargin;
};

export const shouldShowFloatingButtons = (): boolean => {
  return isMobile() || isTablet();
};

export const getGridColumns = (xs: number, md: number, lg: number): { xs: number; md: number; lg: number } => {
  return { xs, md, lg };
};

export const addTouchFriendlyStyles = (baseStyles: React.CSSProperties): React.CSSProperties => {
  if (!isMobile()) return baseStyles;

  return {
    ...baseStyles,
    minHeight: '44px', // Minimum touch target size
    padding: `${Math.max(12, parseInt(String(baseStyles.padding)) || 12)}px`,
    fontSize: getOptimalFontSize(parseInt(String(baseStyles.fontSize)) || 16),
  };
};

export const getMobileBreakpoints = () => ({
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
});

export const useResponsiveValue = <T>(mobileValue: T, tabletValue: T, desktopValue: T): T => {
  if (isMobile()) return mobileValue;
  if (isTablet()) return tabletValue;
  return desktopValue;
};