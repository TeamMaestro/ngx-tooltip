import { Injectable } from '@angular/core';
import tippy, { HideAllOptions } from 'tippy.js';

@Injectable()
export class TooltipService {

    hideAll(options?: HideAllOptions) {
        tippy.hideAll(options);
    }
}
