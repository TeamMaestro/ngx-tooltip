import { Component, OnInit } from '@angular/core';
import { TooltipOptions, TooltipContent } from 'dist/ngx-tooltip';
// import { TooltipOptions, TooltipContent } from '@teamhive/ngx-tooltip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    options: TooltipOptions = {
    };

    demoText = 'Lorem ipsum dolor';

    tooltipElement: TooltipContent;

    animateOptions = {
        animateFill: false
    };

    constructor() {
    }

    ngOnInit() {
        this.tooltipElement = document.getElementById('tooltip-template-demo-1');
    }
}
