import { Instance as TooltipInstance } from 'tippy.js';
export type TooltipAnimation = 'shift-away' | 'shift-toward' | 'fade' | 'scale' | 'perspective';
export type TooltipArrowType = 'sharp' | 'round';
export {
    Instance as TooltipInstance,
    Props as TooltipOptions,
    Placement as TooltipPlacement,
    Content as TooltipContent
} from 'tippy.js';
export type TooltipState = Partial<TooltipInstance['state']>;
