import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
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


    constructor(@Optional() @SkipSelf() parentModule: TooltipModule) {
        if (parentModule) {
          throw new Error(
            'TooltipModule is already loaded. Import it in the AppModule only');
        }
    }


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
