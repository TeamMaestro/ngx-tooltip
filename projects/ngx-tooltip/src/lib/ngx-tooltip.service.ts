import { Injectable } from '@angular/core';
import tippy, { HideAllOptions } from 'tippy.js';
import { TooltipInstance } from './ngx-tooltip.types';

@Injectable()
export class TooltipService {

    private instances = new Map<number, TooltipInstance>();

    /**
     * Adds `TooltipInstance` to collection.
     * Used for internal module functionality, so should be used with caution.
     * @param instance `TooltipInstance` to be added
     */
    addInstance(instance: TooltipInstance) {
        if (instance.id) {
            if (!this.instances.has(instance.id)) {
                this.instances.set(instance.id, instance);
            } else {
                console.error('TooltipInstance already exists in collection: cannot be added to collection');
            }
        } else {
            console.error('TooltipInstance missing necessary \'id\ property: cannot be added to collection');
        }
    }

    /**
     * Removes `TooltipInstance` from collection.
     * Used for internal module functionality, so should be used with caution.
     * @param instance `TooltipInstance` to be removed
     */
    removeInstance(instance: TooltipInstance) {
        if (instance.id) {
            if (this.instances.has(instance.id)) {
                return this.instances.delete(instance.id);
            } else {
                console.error('TooltipInstance does not exist in collection: cannot be removed from collection');
            }
        } else {
            console.error('TooltipInstance missing necessary \'id\ property: cannot be removed from collection');
        }
    }

    /**
     * Hides all `TooltipInstance`s generated thus far
     */
    hideAll(options?: HideAllOptions) {
        tippy.hideAll(options);
    }

    /**
     * Shows all `TooltipInstance`s generated thus far
     */
    showAll(duration?: number) {
        this.instances.forEach(instance => instance.show(duration));
    }

    /**
     * Disables all `TooltipInstance`s generated thus far
     */
    disableAll() {
        this.instances.forEach(instance => instance.disable());
    }

    /**
     * Enables all `TooltipInstance`s generated thus far.
     * Tooltips without content remain disabled to prevent empty tooltips from being displayed.
     */
    enableAll() {
        this.instances.forEach(instance => {
            if (instance.props.content) {
                instance.enable();
            }
        });
    }

    /**
     * Destroys all `TooltipInstance`s generated thus far, and clears the collection.
     */
    destroyAll() {
        this.instances.forEach(instance => instance.destroy());
        this.instances.clear();
    }
}
