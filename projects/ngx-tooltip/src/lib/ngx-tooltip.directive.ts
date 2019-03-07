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


    constructor(
        @Inject(TooltipOptionsService) private initOptions,
        private el: ElementRef,
    ) {}


    getAllTooltipOptions() {
        const options = Object.assign(Object.assign({}, this.initOptions || {}), this.tooltipOptions);
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


    setTheme() {
        // generate theme class name
        const theme =
            this.tooltipTheme
            || (this.tooltipOptions ? this.tooltipOptions.theme : null)
            || (this.initOptions ? this.initOptions.theme : null)
            || '';

        // if a theme name was provided, then generate styling
        if (theme && theme.length > 1) {

            // if theme style element doesn't exist then create it
            let style = document.querySelector(`style.tooltip-${theme}`);
            if (!style) {
                style = document.createElement('style');
                style.setAttribute('class', `tooltip-${theme}`);

                // based on tippy.js theming docs: https://atomiks.github.io/tippyjs/themes/#creating-a-theme
                style.innerHTML =
                    `.tippy-tooltip.${theme}-theme {
                        background-color: var(--tooltip-${theme}-color-background) !important;
                        color: var(--tooltip-${theme}-color) !important;
                        font: var(--tooltip-${theme}-font) !important;
                    }
                    .tippy-tooltip.${theme}-theme[data-animatefill] {
                        background-color: transparent !important;
                    }
                    .tippy-tooltip.${theme}-theme .tippy-backdrop {
                        background-color: var(--tooltip-${theme}-background) !important;
                    }
                    .tippy-popper[x-placement^='top'] .tippy-tooltip.${theme}-theme .tippy-arrow {
                        border-top-color: var(--tooltip-${theme}-arrow) !important;
                    }
                    .tippy-popper[x-placement^='bottom'] .tippy-tooltip.${theme}-theme .tippy-arrow {
                        border-bottom-color: var(--tooltip-${theme}-arrow) !important;
                    }
                    .tippy-popper[x-placement^='left'] .tippy-tooltip.${theme}-theme .tippy-arrow {
                        border-left-color: var(--tooltip-${theme}-arrow) !important;
                    }
                    .tippy-popper[x-placement^='right'] .tippy-tooltip.${theme}-theme .tippy-arrow {
                        border-right-color: var(--tooltip-${theme}-arrow) !important;
                    }
                    .tippy-tooltip.${theme}-theme .tippy-roundarrow {
                        fill: var(--tooltip-${theme}-arrow) !important;
                    }`;
                this.el.nativeElement.parentNode.insertBefore(style, this.el.nativeElement);
            }
        }
    }


    ngOnInit() {
        const tooltipOptions = this.getAllTooltipOptions();
        this.setTheme();
        this.tooltipInstance = tippy(this.el.nativeElement, tooltipOptions);
    }
}
