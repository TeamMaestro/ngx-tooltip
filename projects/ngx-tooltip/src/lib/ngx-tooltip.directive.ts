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
        this.theme =
            this.tooltipTheme
            || (this.tooltipOptions ? this.tooltipOptions.theme : null)
            || (this.initOptions ? this.initOptions.theme : null)
            || '';

        // if a theme name was provided, then generate styling
        if (this.theme && this.theme.length > 1) {

            try {
                // if theme style element doesn't exist then create it
                let style = document.querySelector(`style#ngx-tooltip-${this.theme}-theme`);
                if (!style) {
                    style = document.createElement('style');
                    style.setAttribute('id', `ngx-tooltip-${this.theme}-theme`);

                    // based on tippy.js theming docs: https://atomiks.github.io/tippyjs/themes/#creating-a-theme
                    style.innerHTML = ([
                        `.tippy-tooltip.${this.theme}-theme {`,
                            `background-color: var(--tooltip-${this.theme}-color-background);`,
                            `color: var(--tooltip-${this.theme}-color);`,
                            `font: var(--tooltip-${this.theme}-font);`,
                            `box-shadow: var(--tooltip-${this.theme}-shadow);`,
                        `}`,
                        `.tippy-tooltip.${this.theme}-theme[data-animatefill] {`,
                            `background-color: var(--tooltip-${this.theme}-background);`,
                        `}`,
                        `.tippy-tooltip.${this.theme}-theme .tippy-backdrop {`,
                            `background-color: var(--tooltip-${this.theme}-background);`,
                        `}`,
                        `.tippy-popper[x-placement^='top'] .tippy-tooltip.${this.theme}-theme .tippy-arrow {`,
                            `border-top-color: var(--tooltip-${this.theme}-arrow);`,
                        `}`,
                        `.tippy-popper[x-placement^='bottom'] .tippy-tooltip.${this.theme}-theme .tippy-arrow {`,
                            `border-bottom-color: var(--tooltip-${this.theme}-arrow);`,
                        `}`,
                        `.tippy-popper[x-placement^='left'] .tippy-tooltip.${this.theme}-theme .tippy-arrow {`,
                            `border-left-color: var(--tooltip-${this.theme}-arrow);`,
                        `}`,
                        `.tippy-popper[x-placement^='right'] .tippy-tooltip.${this.theme}-theme .tippy-arrow {`,
                            `border-right-color: var(--tooltip-${this.theme}-arrow);`,
                        `}`,
                        `.tippy-tooltip.${this.theme}-theme .tippy-roundarrow {`,
                            `fill: var(--tooltip-${this.theme}-arrow);`,
                        `}`]).join('');
                    document.head.appendChild(style);
                }

            // porbably using Angular with server or web worker platform.
            } catch (error) {
                throw new Error(
                    'Error in DOM query. May be the result of conflicts between @teamhive/ngx-tooltip and Angular with server or webworker'
                );
            }
        }
    }

    ngOnInit() {
        const tooltipOptions = this.getAllTooltipOptions();
        this.setTheme();
        this.tooltipInstance = tippy(this.el.nativeElement, tooltipOptions);
    }
}
