import { Directive, Input, OnInit, ElementRef, Inject } from '@angular/core';
import tippy from 'tippy.js';
import { TooltipOptionsService } from './ngx-tooltip-options.service';
import {
    TooltipContent,
    TooltipPlacement,
    TooltipOptions,
    TooltipAnimation,
    TooltipArrowType
} from './ngx-tooltip.types';

@Directive({
    selector: '[ngxTooltip]'
})
export class TooltipDirective implements OnInit {
    @Input('ngxTooltip') tooltipOptions: TooltipOptions;
    @Input() tooltipContent: TooltipContent;
    @Input() tooltipArrowType: TooltipArrowType;
    @Input() tooltipMaxWidth: number | string;
    @Input() tooltipPlacement: TooltipPlacement;
    @Input() tooltipAnimation: TooltipAnimation;
    @Input() tooltipTrigger: string;
    @Input() tooltipTouch: boolean;
    @Input() tooltipTouchHold: boolean;
    @Input() tooltipTheme: string;
    @Input() tooltipAllowHtml: boolean;

    tooltipInstance = null;
    theme = null;


    constructor(
        @Inject(TooltipOptionsService) private initOptions,
        private el: ElementRef,
    ) {}


    getAllTooltipOptions() {
        const options = Object.assign({}, this.initOptions, this.tooltipOptions);
        if (this.tooltipContent) { options.content = this.tooltipContent; }
        if (this.tooltipPlacement) { options.placement = this.tooltipPlacement; }
        if (this.tooltipAnimation) { options.animation = this.tooltipAnimation; }
        if (this.tooltipMaxWidth) { options.maxWidth = this.tooltipMaxWidth; }
        if (this.tooltipTrigger) { options.trigger = this.tooltipTrigger; }
        if (this.tooltipTouch) { options.touch = this.tooltipTouch; }
        if (this.tooltipTouchHold) { options.touchHold = this.tooltipTouchHold; }
        if (this.tooltipTheme) { options.theme = this.tooltipTheme; }
        if (this.tooltipArrowType) {
            options.arrow = true;
            options.arrowType = this.tooltipArrowType;
        }
        return options;
    }


    ngOnInit() {
        const tooltipOptions = this.getAllTooltipOptions();
        this.tooltipInstance = tippy(this.el.nativeElement, tooltipOptions);
    }
}
