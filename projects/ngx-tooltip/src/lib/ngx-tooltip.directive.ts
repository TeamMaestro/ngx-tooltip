import { Directive, Input, ElementRef, Inject, OnDestroy } from '@angular/core';
import tippy from 'tippy.js';
import { TooltipOptionsService } from './ngx-tooltip-options.service';
import {
    TooltipInstance,
    TooltipContent,
    TooltipPlacement,
    TooltipOptions,
    TooltipAnimation,
    TooltipArrowType,
    TooltipState
} from './ngx-tooltip.types';
import { TooltipService } from './ngx-tooltip.service';

@Directive({
    selector: '[ngxTooltip]'
})
export class TooltipDirective implements OnDestroy {

    private options: TooltipOptions = {};
    private tooltipInstance: TooltipInstance = null;

    @Input('ngxTooltip') set tooltipOptions(options: TooltipOptions) {
        this.updateOptions(options);
    }
    get tooltipOptions() {
        return this.options;
    }

    @Input() set tooltipGroup(group: TooltipOptions['group']) {
        this.updateOptions({ group });
    }
    get tooltipGroup() {
        return this.options.group;
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

    @Input() set tooltipMaxWidth(maxWidth: TooltipOptions['maxWidth']) {
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

    @Input() set tooltipTrigger(trigger: TooltipOptions['trigger']) {
        this.updateOptions({ trigger });
    }
    get tooltipTrigger() {
        return this.options.trigger;
    }

    @Input() set tooltipTouch(touch: TooltipOptions['touch']) {
        this.updateOptions({ touch });
    }
    get tooltipTouch() {
        return this.options.touch;
    }

    @Input() set tooltipTouchHold(touchHold: TooltipOptions['touchHold']) {
        this.updateOptions({ touchHold });
    }
    get tooltipTouchHold() {
        return this.options.touchHold;
    }

    @Input() set tooltipTheme(theme: TooltipOptions['theme']) {
        this.updateOptions({ theme });
    }
    get tooltipTheme() {
        return this.options.theme;
    }

    @Input() set tooltipAllowHtml(allowHTML: TooltipOptions['allowHTML']) {
        this.updateOptions({ allowHTML });
    }
    get tooltipAllowHtml() {
        return this.options.allowHTML;
    }

    constructor(
        @Inject(TooltipOptionsService) private initOptions: TooltipOptions,
        private el: ElementRef,
        private tooltipService: TooltipService,
    ) {
        this.create();
        this.updateOptions(this.options);
    }

    ngOnDestroy() {
        this.destroy();
    }

    get state(): TooltipState {
        return this.tooltipInstance ? this.tooltipInstance.state : {};
    }

    get id() {
        return this.tooltipInstance ? this.tooltipInstance.id : undefined;
    }

    get group() {
        return this.tooltipInstance ? this.tooltipInstance.group : undefined;
    }


    /**
     * Update the `TooltipInstance` options, and update the related state and collections.
     * @param options block of any or all new `TooltipOption` to be added to `TooltipInstance`
     */
    private updateOptions(options: Partial<TooltipOptions>) {
        // clean options object
        const previousGroup = this.group; // save previous group to maintain group collections
        this.options = this.cleanOptions({ ...this.initOptions, ...this.options, ...options });
        const { group } = this.options;
        delete this.options.group; // group is not a valid tippy.js prop so must be removed

        // set options
        if (this.state.isEnabled) {
            if (this.options.content) {
                this.tooltipInstance.set(this.options);
            } else {
                this.disable(); // tooltips without content should be disabled
            }

        // ensure tooltip is only enabled if it has content
        } else if (this.options.content) {
            this.enable();
            return this.updateOptions({ ...this.options, group }); // retry update
        }

        // maintain group collections
        this.options.group = group;
        this.tooltipInstance.group = group;
        if (previousGroup !== group) {
            if (previousGroup) {
                this.tooltipService.removeGroupInstance(this.id, previousGroup);
            }
            if (group) {
                this.tooltipService.addGroupInstance(this.tooltipInstance);
            }
        }
    }


    /**
     * Cleans provided options object by deleting all `null` or `undefined` properties
     */
    private cleanOptions(options: Partial<TooltipOptions>) {
        for (const prop in options) {
            if (options[prop] === null || options[prop] === undefined) {
                delete options[prop];
            }
        }
        return options;
    }


    /**
     * Create new `TooltipInstance` and add to collections
     */
    private create() {
        this.tooltipInstance = tippy(this.el.nativeElement) as TooltipInstance;
        this.tooltipService.addInstance(this.tooltipInstance);
    }


    /**
     * Destroy current `TooltipInstance` and remove from collections
     */
    destroy() {
        if (this.tooltipInstance) {
            this.tooltipInstance.destroy();
        }
        this.tooltipService.removeInstance(this.id, this.group);
        this.tooltipInstance = null;
    }


    /**
     * Enable current `TooltipInstance` or create new `TooltipInstance` if it doesn't yet exits.
     */
    enable() {
        if (this.tooltipInstance) {
            this.tooltipInstance.enable();
        } else {
            this.create();
        }
    }


    /**
     * Disable current `TooltipInstance`
     */
    disable() {
        if (this.tooltipInstance) {
            this.tooltipInstance.disable();
        }
    }


    /**
     *  Show current `TooltipInstance`. Ignores enabled status.
     * @param duration length in milliseconds of show animation
     */
    show(duration?: number) {
        if (this.tooltipInstance) {
            this.tooltipInstance.show(duration);
        }
    }


    /**
     * Hide current `TooltipInstance`
     * @param duration length in milliseconds of hide animation
     */
    hide(duration?: number) {
        if (this.tooltipInstance) {
            this.tooltipInstance.hide(duration);
        }
    }
}
