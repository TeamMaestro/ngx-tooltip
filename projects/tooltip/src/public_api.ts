/*
 * Public API Surface of tooltip
 */
export * from './lib/tooltip.directive';
export * from './lib/tooltip.module';
export {
    Props as TooltipOptions,
    Placement as TooltipPlacement,
    Targets as TooltipTargets,
    Content as TooltipContent
} from 'tippy.js';
