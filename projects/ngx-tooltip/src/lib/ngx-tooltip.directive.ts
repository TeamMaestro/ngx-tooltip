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
export class TooltipDirective {

    private options: TooltipOptions = {};
    private tooltipInstance: TooltipInstance = null;

    @Input('ngxTooltip') set tooltipOptions(options: TooltipOptions) {
        this.updateOptions(options);
    }
    get tooltipOptions() {
        return this.options;
    }

    @Input() set tooltipContent(content: TooltipContent) {
        this.updateOptions({ content });
    }
    get tooltipContent() {
        return this.options.content;
    }

    @Input() set tooltipArrowType(arrowType: TooltipArrowType) {
        this.options.arrow = true;
        this.updateOptions({ arrowType });
    }
    get tooltipArrowType() {
        return this.options.arrowType;
    }

    @Input() set tooltipMaxWidth(maxWidth: number | string) {
        this.updateOptions({ maxWidth });
    }
    get tooltipMaxWidth() {
        return this.options.maxWidth;
    }

    @Input() set tooltipPlacement(placement: TooltipPlacement) {
        this.updateOptions({ placement });
    }
    get tooltipPlacement() {
        return this.options.placement;
    }

    @Input() set tooltipAnimation(animation: TooltipAnimation) {
        this.updateOptions({ animation });
    }
    get tooltipAnimation() {
        return this.options.animation;
    }

    @Input() set tooltipTrigger(trigger: string) {
        this.updateOptions({ trigger });
    }
    get tooltipTrigger() {
        return this.options.trigger;
    }

    @Input() set tooltipTouch(touch: boolean) {
        this.updateOptions({ touch });
    }
    get tooltipTouch() {
        return this.options.touch;
    }

    @Input() set tooltipTouchHold(touchHold: boolean) {
        this.updateOptions({ touchHold });
    }
    get tooltipTouchHold() {
        return this.options.touchHold;
    }

    @Input() set tooltipTheme(theme: string) {
        this.updateOptions({ theme });
    }
    get tooltipTheme() {
        return this.options.theme;
    }

    @Input() set tooltipAllowHtml(allowHTML: boolean) {
        if (allowHTML !== null || allowHTML !== undefined) {

        }
        this.updateOptions({ allowHTML });
    }


    constructor(
        @Inject(TooltipOptionsService) private initOptions,
        private el: ElementRef,
    ) {
        this.create();
        this.updateOptions(this.options);
    }

    get isEnabled() {
        return this.tooltipInstance && this.tooltipInstance.state.isEnabled;
    }

    updateOptions(options: TooltipOptions) {
        // clean options object
        this.options = this.cleanOptions({ ...this.initOptions, ...this.options, ...options });
        if (this.isEnabled) {
            if (this.options.content) {
                this.tooltipInstance.set(this.options);
            } else {
                this.disable();
            }
        } else if (this.options.content) {
            this.enable();
            this.updateOptions(this.options);
        }
    }

    setOptions(options: TooltipOptions) {
        this.options = options;
        if (this.tooltipInstance) {
            this.tooltipInstance.set(options);
        }
    }

    cleanOptions(options: any) {
        for (const prop in options) {
            if (options[prop] === null || options[prop] === undefined) {
                delete options[prop];
            }
        }
        return options;
    }

    create() {
        this.tooltipInstance = tippy(this.el.nativeElement) as TooltipInstance;
    }

    destroy() {
        if (this.tooltipInstance) {
            this.tooltipInstance.destroy();
        }
        this.tooltipInstance = null;
    }

    enable() {
        if (this.tooltipInstance) {
            this.tooltipInstance.enable();
        } else {
            this.create();
        }
    }

    disable() {
        if (this.tooltipInstance) {
            this.tooltipInstance.disable();
        }
    }
}
