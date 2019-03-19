import { Directive, Input, OnInit, ElementRef, Inject } from '@angular/core';
import tippy from 'tippy.js';
import { TooltipOptionsService } from './ngx-tooltip-options.service';
import {
    TooltipInstance,
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

    private options: TooltipOptions;
    private tooltipInstance: TooltipInstance = null;

    @Input('ngxTooltip') set tooltipOptions(options: TooltipOptions) {
        this.setOptions(options);
    }
    get tooltipOptions() {
        return this.options;
    }

    @Input() set tooltipContent(content: TooltipContent) {
        this.setOptions({ content });
    }
    get tooltipContent() {
        return this.options.content;
    }

    @Input() set tooltipArrowType(arrowType: TooltipArrowType) {
        this.options.arrow = true;
        this.setOptions({ arrowType });
    }
    get tooltipArrowType() {
        return this.options.arrowType;
    }

    @Input() set tooltipMaxWidth(maxWidth: number | string) {
        this.setOptions({ maxWidth });
    }
    get tooltipMaxWidth() {
        return this.options.maxWidth;
    }

    @Input() set tooltipPlacement(placement: TooltipPlacement) {
        this.setOptions({ placement });
    }
    get tooltipPlacement() {
        return this.options.placement;
    }

    @Input() set tooltipAnimation(animation: TooltipAnimation) {
        this.setOptions({ animation });
    }
    get tooltipAnimation() {
        return this.options.animation;
    }

    @Input() set tooltipTrigger(trigger: string) {
        this.setOptions({ trigger });
    }
    get tooltipTrigger() {
        return this.options.trigger;
    }

    @Input() set tooltipTouch(touch: boolean) {
        this.setOptions({ touch });
    }
    get tooltipTouch() {
        return this.options.touch;
    }

    @Input() set tooltipTouchHold(touchHold: boolean) {
        this.setOptions({ touchHold });
    }
    get tooltipTouchHold() {
        return this.options.touchHold;
    }

    @Input() set tooltipTheme(theme: string) {
        this.setOptions({ theme });
    }
    get tooltipTheme() {
        return this.options.theme;
    }

    @Input() set tooltipAllowHtml(allowHTML: boolean) {
        this.setOptions({ allowHTML });
    }


    constructor(
        @Inject(TooltipOptionsService) private initOptions,
        private el: ElementRef,
    ) {
        this.options = {};
    }


    setOptions(options: TooltipOptions) {
        this.options = Object.assign(this.options || {}, options);
        if (this.tooltipInstance) {
            this.tooltipInstance.set(options);
        }
    }


    ngOnInit() {
        this.options = Object.assign({}, this.initOptions || {}, this.tooltipOptions || {}, this.options || {});
        this.tooltipInstance = tippy(this.el.nativeElement, this.options) as TooltipInstance;
    }
}
