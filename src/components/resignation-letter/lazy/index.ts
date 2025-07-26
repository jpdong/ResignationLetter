import { lazy } from 'react';

// Lazy load heavy components that are not immediately visible
export const LazyResignationGuide = lazy(() => import('../ResignationGuide'));
export const LazyResignationFAQ = lazy(() => import('../ResignationFAQ'));
export const LazyDownloadOptions = lazy(() => import('../DownloadOptions'));