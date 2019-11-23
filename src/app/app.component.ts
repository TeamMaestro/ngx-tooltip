import { Component, ViewChild } from '@angular/core';
import { TooltipOptions, TooltipDirective, TooltipService } from 'dist/ngx-tooltip';
// import { TooltipOptions, TooltipContent } from '@teamhive/ngx-tooltip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    animateOptions = {
        animateFill: false
    };

    customSchemeOptions: TooltipOptions = {
        trigger: 'manual',
        interactive: true,
        hideOnClick: false,
    };

    @ViewChild('customSchemeTooltip', { read: TooltipDirective }) customSchemeTooltip: TooltipDirective;

    constructor(
        public tooltipService: TooltipService
    ) {}

    showCustomSchemeTooltip() {
        this.customSchemeTooltip.show();
    }

    hideCustomSchemeTooltip() {
        this.customSchemeTooltip.hide();
        }
    }
