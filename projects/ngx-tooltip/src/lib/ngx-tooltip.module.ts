import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './ngx-tooltip.directive';
import { TooltipOptionsService } from './ngx-tooltip-options.service';
import { TooltipOptions } from './ngx-tooltip.types';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TooltipDirective
    ],
    exports: [
        TooltipDirective
    ]
})
export class TooltipModule {


    static forRoot(initOptions: TooltipOptions): ModuleWithProviders {
        return {
            ngModule: TooltipModule,
            providers: [
                {
                    provide: TooltipOptionsService,
                    useValue: initOptions
                }
            ]
        };
    }
}
