/**
 * Animation types for the BestIT Consulting website
 * Based on the data model from specs/001-ui-ux-enhancement/data-model.md
 */

export enum MotionPreference {
  REDUCED = 'reduced',
  NORMAL = 'normal',
  ENHANCED = 'enhanced'
}

export enum PerformanceMode {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface AnimationState {
  motionPreference: MotionPreference;
  animationEnabled: boolean;
  performanceMode: PerformanceMode;
  reducedMotion: boolean;
  staggerDelay: number;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  stagger: number;
  respectReducedMotion: boolean;
}
