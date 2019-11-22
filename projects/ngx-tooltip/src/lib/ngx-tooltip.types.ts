import { Instance, Props, Content } from 'tippy.js';

export { Placement as TooltipPlacement } from 'tippy.js';

export type TooltipAnimation = 'shift-away' | 'shift-toward' | 'fade' | 'scale' | 'perspective';

export type TooltipArrowType = 'sharp' | 'round';

export type TooltipState = Partial<Instance['state']>;

export type TooltipOptions = Props & { group?: string | number };

export type TooltipContent = Content;

export type TooltipInstance = Exclude<Instance, 'props' | 'state'>
    & {
        props: TooltipOptions;
        state: TooltipState;
        group?: string | number
    };
