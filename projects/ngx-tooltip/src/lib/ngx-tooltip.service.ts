import { Injectable } from '@angular/core';
import tippy, { HideAllOptions } from 'tippy.js';
import { TooltipInstance } from './ngx-tooltip.types';

@Injectable()
export class TooltipService {

    // tslint:disable-next-line:variable-name
    private _instances = new Map<TooltipInstance['id'], TooltipInstance>();
    private groups = new Map<TooltipInstance['group'], Map<TooltipInstance['id'], TooltipInstance>>();

    get instances() {
        return this._instances;
    }

    /**
     * Returns given group TooltipInstance collection
     * @param group id of group collection to be retrieved
     */
    getGroup(group: TooltipInstance['group']) {
        return this.groups.get(group);
    }

    /**
     * Adds `TooltipInstance` to collections.
     * Used for internal module functionality, so should be used with caution.
     * @param instance `TooltipInstance` to be added
     */
    addInstance(instance: TooltipInstance) {
        if (instance && instance.id) {
            if (!this.instances.has(instance.id)) {
                this.instances.set(instance.id, instance);
                if (instance.group) {
                    this.addGroupInstance(instance);
                }
            } else {
                console.error('TooltipInstance already exists in collection: cannot be added to collection');
            }
        } else {
            console.error('TooltipInstance missing necessary \'id\ property: cannot be added to collection');
        }
    }

    /**
     * Adds `TooltipInstance` to group collection.
     * Used for internal module functionality, so should be used with caution.
     * @param instance `TooltipInstance` to be added
     */
    addGroupInstance(instance: TooltipInstance) {
        if (!this.groups.has(instance.group)) {
            this.groups.set(instance.group, new Map<TooltipInstance['id'], TooltipInstance>());
        }
        this.groups.get(instance.group).set(instance.id, instance);
    }

    /**
     * Removes `TooltipInstance` from collection.
     * Used for internal module functionality, so should be used with caution.
     * @param id unique numeric `TooltipInstance` id
     * @param group if provided, `TooltipInstance` will be removed from group collection as well as global instance collection.
     */
    removeInstance(id: TooltipInstance['id'], group?: TooltipInstance['group']) {
        if (this.instances.has(id)) {
            this.instances.delete(id);
        } else {
            console.error('TooltipInstance does not exist in collection: cannot be removed from collection');
        }
        if (group) {
            this.removeGroupInstance(id, group);
        }
    }

    /**
     * Removes `TooltipInstance` from group collection.
     * Used for internal module functionality, so should be used with caution.
     * @param id unique numeric `TooltipInstance` id
     * @param group group id of the collection from which the TooltipInstance will be removed.
     */
    removeGroupInstance(id: TooltipInstance['id'], group: TooltipInstance['group']) {
        if (this.groups.has(group)) {
            if (this.groups.get(group).has(id)) {
                this.groups.get(group).delete(id);
            } else {
                console.error('TooltipInstance does not exist in group collection: cannot be removed from group collection');
            }
        } else {
            console.error('Group does not exist in group collection: cannot remove TooltipInstance');
        }
    }

    /**
     * Hides all `TooltipInstance`s generated thus far.
     * @param group group id which, if provided, causes function to affect only those instances belonging to the group.
     */
    hideAll(options ?: HideAllOptions, group ?: TooltipInstance['group']) {
        if (group && this.groups.has(group)) {
            this.groups.get(group).forEach(instance => instance.hide());
        } else {
            tippy.hideAll(options);
        }
    }

    /**
     * Shows all `TooltipInstance`s generated thus far.
     * @param group group id which, if provided, causes function to affect only those instances belonging to the group.
     */
    showAll(duration?: TooltipInstance['id'], group?: TooltipInstance['group']) {
        (this.groups.get(group) || this.instances).forEach(instance => instance.show(duration));
    }

    /**
     * Disables all `TooltipInstance`s generated thus far.
     * @param group group id which, if provided, causes function to affect only those instances belonging to the group.
     */
    disableAll(group?: TooltipInstance['group']) {
        (this.groups.get(group) || this.instances).forEach(instance => instance.disable());
    }

    /**
     * Enables all `TooltipInstance`s generated thus far.
     * Tooltips without content remain disabled to prevent empty tooltips from being displayed.
     * @param group group id which, if provided, causes function to affect only those instances belonging to the group.
     */
    enableAll(group?: TooltipInstance['group']) {
        (this.groups.get(group) || this.instances).forEach(instance => {
            if (instance.props.content) {
                instance.enable();
            }
        });
    }

    /**
     * Destroys all `TooltipInstance`s generated thus far, and clears the collection.
     * @param group group id which, if provided, causes function to affect only those instances belonging to the group.
     */
    destroyAll(group?: TooltipInstance['group']) {
        if (group && this.groups.has(group)) {
            this.groups.get(group).forEach(instance => {
                this.instances.delete(instance.id);
                instance.destroy();
            });
            this.groups.get(group).clear();
        } else {
            this.instances.forEach(instance => instance.destroy());
            this.instances.clear();
        }
    }
}
