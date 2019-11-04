# NgxTooltip
**Built on top of [Tippy.js](https://atomiks.github.io/tippyjs/)**

<img width="400" src="https://user-images.githubusercontent.com/35740174/53966936-32b3fb80-40c2-11e9-8a2b-b8ad9e94a440.gif"></img>

## Install
```
npm i @teamhive/ngx-tooltip
```


## Getting Started
_example.module.ts_
```ts
⋮
import { NgModule } from '@angular/core';
import { TooltipModule, TooltipOptions } from '@teamhive/ngx-tooltip';

@NgModule({
    ⋮
    imports: [
        TooltipModule.forRoot({
            // custom defaults go here e.g.
            placement: 'top',
            arrow: 'true',
            arrowType: 'sharp',
            allowHTML: true,
            maxWidth: 200
        } as TooltipOptions)
    ]
    ⋮
})
export class ExampleModule { }
```


## Usage
### Basic
_example.component.html_
```html
<div ngxTooltip tooltipContent="Lorem ipsum dolor…"> … </div>
```
### HTML Content
⚠️&nbsp;&nbsp;&nbsp;**you should almost certainly [santitize](https://angular.io/api/platform-browser/DomSanitizer) any html you didn't make yourself!**

_example.component.ts_
```ts
import { TooltipContent } from '@teamhive/ngx-tooltip';
⋮
tooltipElement: TooltipContent;
⋮
ngOnInit() {
    this.tooltipElement = document.getElementById('tooltip-template');
    ⋮
}
⋮
```
_example.component.html_
```html
<div ngxTooltip [tooltipAllowHtml]="true" tooltipContent="<span> … </span>"> … </div>

<!-- or -->

<span id="tooltip-template"> … </span>
<div ngxTooltip [tooltipAllowHtml]="true" [tooltipContent]="templateElement"> … </div>

<!-- or, best yet (Yay for template reference variables!!!!) -->

<span #tooltipTemplate> … </span>
<div ngxTooltip [tooltipAllowHtml]="true" [tooltipContent]="tooltipTemplate"> … </div>
```
### Specify Options
_example.component.ts_
```ts
import { TooltipOptions } from '@teamhive/ngx-tooltip';
⋮
tooltipOptions: TooltipOptions = {
    placement: 'top',
    arrow: 'true',
    arrowType: 'sharp',
    allowHTML: true,
    content: '<span …> … </span>'
};
⋮
```
_example.component.html_
```html
<div [ngxTooltip]="{content: 'Lorem ipsum dolor…', maxWidth: 200 …}"> … </div>

<!-- or -->

<div [ngxTooltip]="tooltipOptions"> … </div>
```

## TooltipService
_example.component.ts_
```ts
import { TooltipService } from '@teamhive/ngx-tooltip';
⋮
constructor(tooltipService: TooltipService) {}
⋮
forceCloseAll() {
    tooltipService.hideAll();
}
⋮
```
| method | Description |
|---|---|
| `hideAll()` | Hides all `TooltipInstance`s|
| `enableAll()` | Enables all `TooltipInstance`s|
| `disableAll()` | Disables all `TooltipInstance`s|
| `destroyAll()` | Destroys all `TooltipInstance`s|


## Properties
**Some commonly used options are made available through element properties.**
[**see full list of options**](#All-Options)

|property|Description|type|
|---|---|---|
|`ngxTooltip`| all options can be passed via the directive itself | <span style="color: gold">TooltipOptions</span> |
|`tooltipContent`| The content of the tooltip. Along with a string or element, you can use a function that takes the reference element as an argument and returns content. |  <ul><li><span style="color: gold">TooltipContent</span></li><li> <span style="color: dodgerblue;">string</span> \| <span style="color: gold">Element</span> \| ((ref: <span style="color: gold">Element</span>) => <span style="color: gold">Element</span> \| <span style="color: dodgerblue;">string</span>)</li><ul> |
|`tooltipPlacement`| Positions the tippy relative to its reference element. Use the suffix <span style="color: green">'-start'</span> or <span style="color: green">'-end'</span> to shift the tippy to the start or end of the reference element, instead of centering it. For example, top-start or left-end. | <ul><li><span style="color: gold">TooltipPlacement</span></li><li> <span style="color: green">'top'</span> \| <span style="color: green">'bottom'</span> \| <span style="color: green">'left'</span> \| <span style="color: green">'right'</span> \| <span style="color: green">'top-start'</span> \| <span style="color: green">'top-end'</span> \| <span style="color: green">'bottom-start'</span> \| <span style="color: green">'bottom-end'</span> \| <span style="color: green">'left-start'</span> \| <span style="color: green">'left-end'</span> \| <span style="color: green">'right-start'</span> \| <span style="color: green">'right-end'</li></ul> |
|`tooltipAnimation`| The type of transition animation. | <ul><li><span style="color: gold;">TooltipAnimation</span></li><li><span style="color: green;">'shift-away'</span> \| <span style="color: green;">'shift-toward'</span> \| <span style="color: green">'fade'</span> \| <span style="color: green">'scale'</span> \| <span style="color: green;">'perspective'</span></li></ul> |
|`tooltipTrigger`| The events (each separated by a space) which cause a tippy to show. Possible values: <span style="color: green;">"mouseenter"</span>, <span style="color: green">"focus"</span>, <span style="color: green;">"click"</span>, <span style="color: green;">"manual"</span>. Use <span style="color: green;">"manual"</span> to only trigger the tippy programmatically. | <span style="color: dodgerblue;">string</span> |
| `tooltipTouch` | Determines if tooltip works on touch devices | <span style="color: dodgerblue;">boolean</span> |
| `tooltipTouchHold` | Determines trigger behavior on touch devices. Instead of a tap on the reference to show and a tap elsewhere to hide the tippy, the reference must be pressed and held for the tippy to show. Letting go from the screen will hide it. | <span style="color: dodgerblue;">boolean</span> |
|`tooltipArrowType`| Determines the arrow type. Using this property automatically enables the arrow option | <ul><li><span style="color: gold;">TooltipArrowType</span></li><li><span style="color: green;">'sharp'</span> \| <span style="color: green;">'round'</span></li></ul> |
|`tooltipMaxWidth`|  Determines the maximum width of the tippy - use a number for pixels, or a string to add units such as rem. In CSS, it's defined as <span style="color: sandybrown;">350px</span> by default. This option applies the width to the style attribute of the tippy element. | <span style="color: dodgerblue;">number</span> \| <span style="color: dodgerblue;">string</span>
|`tooltipTheme`| Themes added as classes (each separated by a space) to the ngx-tooltip element's. | <span style="color: dodgerblue;">string</span>
|`tooltipAllowHtml` | Determines if the tooltip can have HTML content rendered inside of it. | <span style="color: dodgerblue;">boolean</span> |


## Theming
@teamhive/ngx-tooltip makes use of css variables for theming.

When you pass a theme name via `TooltipModule.forRoot{}`, `ngxTooltip`, or `tooltipTheme` - a css class is attatched to the tooltip elements so they can be targeted for styling.

### CSS Variables

| Variable | Description |
|---|---|
| `--tooltip-color` | Full CSS `color` property. |
| `--tooltip-arrow-color` | Color of arrow. Used for various properties necessary to properly & uniformly color arrow. It is highly recommended to keep same as background color. |
| `--tooltip-background-color` | Full CSS `background-color` property. |
| `--tooltip-font-size` | Full CSS `font-size` property. |
| `--tooltip-font-weight` | Full CSS `font-weight` property. |
| `--tooltip-font-style` | Fulll CSS `font-style` property. |
| `--tooltip-font-family` | Full CSS `font-famliy` property. |
| `--tooltip-box-shadow` | Full CSS `box-shadow` property. |
| `--tooltip-border-radius` | Full CSS `border-radius` property. |
| `--tooltip-text-align` | Full CSS `text-align` property. |
| `--tooltip-padding` | Full CSS `padding` property. |

_example.scss_
```scss
// the package styles.css file must be imported to use css variables
@import "@teamhive/ngx-tooltip/assets/styles/styles.css";

// custom styling should be placed in class selector of `${customThemeName}-theme`
.currant-theme {
    --tooltip-color: #9df2a4;               // seafoam
    --tooltip-arrow-color: #463E53;         // blackcurrant
    --tooltip-background-color: #463E53;    // blackcurrant
    --tooltip-font-size: 16px;
    --tooltip-font-weight: 500;
    --tooltip-font-style: normal;
    --tooltip-font-family: "Helvetica Neue", Helvetica, sans-serif;
    --tooltip-box-shadow: 2px 2px 5px grey;
    --tooltip-border-radius: 5px;
    --tooltip-text-align: center;
    --tooltip-padding: 5px;
}
```
_example.component.html_
```html
<div ngxTooltip tooltipTheme="currant" tooltipContent="blackcurrant & seafoam"…>
    custom theme
</div>
```
<img width="400" src="https://user-images.githubusercontent.com/35740174/53969914-a278b500-40c7-11e9-87e4-a985809588a4.gif"></img>

for advanced theming, see the Tippy.js [theming docs](https://atomiks.github.io/tippyjs/themes/).

## All Options
**options taken from tippy.js docs**
<table>
    <thead>
        <tr>
            <th>Option</th>
            <th align="center">Type</th>
            <th align="center">Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td data-label="Option"><code class="language-text">a11y</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">true</code></td>
            <td data-label="Description">Short for <code class="language-text">accessibility</code> - ensures the reference element can receive focus so the tooltip can be activated by keyboard navigation by adding <code class="language-text">tabindex="0"</code> to the reference element.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">animateFill</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">true</code></td>
            <td data-label="Description">Determines if the background fill color should be animated. Disabled if <code class="language-text">arrow: true</code>.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">allowHTML</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">true</code></td>
            <td data-label="Description">Determines if the tippy can have HTML content rendered inside of it. Make sure you are sanitizing any user data if rendering HTML to prevent XSS attacks.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">animation</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">"shift-away"</code></td>
            <td data-label="Description">The type of transition animation. Possible values: <code class="language-text">"shift-away"</code>, <code class="language-text">"shift-toward"</code>, <code class="language-text">"fade"</code>, <code class="language-text">"scale"</code>, <code class="language-text">"perspective"</code></td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">appendTo</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code>, <code class="language-text">Element</code>, <code class="language-text">Function</code></td>
            <td align="center" data-label="Default"><code class="language-text">document.body</code></td>
            <td data-label="Description">The element to append the tippy to. Specify the string <code class="language-text">"parent"</code> to append it to the reference element's parent. You can also define a function that takes the reference element as an argument and returns a new element.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">aria</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">"describedby"</code></td>
            <td data-label="Description">The <code class="language-text">aria-*</code> attribute applied to the reference element. Use either <code class="language-text">"describedby"</code> or <code class="language-text">"labelledby"</code>. Use a falsy value <code class="language-text">null</code> / <code class="language-text">false</code> to prevent the attribute from being added.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">arrow</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines if an arrow should be added to the tippy pointing toward the reference element.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">arrowType</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">"sharp"</code></td>
            <td data-label="Description">Determines the arrow type. Possible values: <code class="language-text">"sharp"</code>, <code class="language-text">"round"</code></td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">boundary</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code>, <code class="language-text">HTMLElement</code></td>
            <td align="center" data-label="Default"><code class="language-text">"scrollParent"</code></td>
            <td data-label="Description">The boundary that Popper.js' <code class="language-text">preventOverflow</code> modifier adheres to. Possible values: <code class="language-text">"scrollParent"</code>, <code class="language-text">"window"</code>, <code class="language-text">"viewport"</code>, or an <code class="language-text">HTMLElement</code>.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">content</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code>, <code class="language-text">Element</code>, <code class="language-text">Function</code></td>
            <td align="center" data-label="Default"><code class="language-text">""</code></td>
            <td data-label="Description">The content of the tippy. Along with a string or element, you can use a function that takes the reference element as an argument and returns content.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">delay</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code>, <code class="language-text">[show, hide]</code></td>
            <td align="center" data-label="Default"><code class="language-text">[0, 20]</code></td>
            <td data-label="Description">Delay in ms once a trigger event is fired before a tippy shows or hides. Specifying a number means both the show and hide delays are the same. Use <code class="language-text">null</code> in the array to use the default value.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">duration</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code>, <code class="language-text">[show, hide]</code></td>
            <td align="center" data-label="Default"><code class="language-text">[275, 250]</code></td>
            <td data-label="Description">Duration of the CSS transition animation in ms. Specifying a number means both the show and hide delays are the same. Use <code class="language-text">null</code> in the array to use the default value.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">distance</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code></td>
            <td align="center" data-label="Default"><code class="language-text">10</code></td>
            <td data-label="Description">How far in pixels the tippy element is from the reference element. Only applies to a single axis and not to the parent popper element, see the <code class="language-text">offset</code> option.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">flip</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">true</code></td>
            <td data-label="Description">Determines if the tippy flips so that it is placed within the viewport as best it can be if there is not enough room.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">flipBehavior</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code>, <code class="language-text">string[]</code></td>
            <td align="center" data-label="Default"><code class="language-text">"flip"</code></td>
            <td data-label="Description">Determines the order of flipping, i.e. which placements to prefer if a certain placement cannot be used. Use an array such as <code class="language-text">["bottom", "left"]</code> to prefer the "left" placement if "bottom" is unavailable, instead of "top".</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">flipOnUpdate</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines if the tippy should flip when necessary if its position updates while showing (for example, while scrolling, resize, or if the size of the tooltip changed).</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">followCursor</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code>, <code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines if the tippy follows the user's mouse cursor while showing. Use the strings <code class="language-text">"vertical"</code> or <code class="language-text">"horizontal"</code> to only follow the cursor on a single axis. Use <code class="language-text">"initial"</code> to place the tippy at the initial cursor position upon show, but prevent following it.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">hideOnClick</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code>, <code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">true</code></td>
            <td data-label="Description">Determines if the tippy should hide if a click event was fired outside of it (i.e. clicking on the reference or the body). For click-triggered tippys, using <code class="language-text">false</code> will prevent the tippy from ever hiding once it is showing. To prevent clicks outside of the tippy from hiding it but still allow it to be toggled, use the string <code class="language-text">"toggle"</code>.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">ignoreAttributes</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines if <code class="language-text">data-tippy-*</code> attributes on the reference element should be ignored. Increases performance if you enable it.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">inertia</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines if an inertial slingshot effect is applied to the CSS transition-timing-function.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">interactive</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines if the tippy is interactive, i.e. it can be hovered over or clicked without hiding.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">interactiveBorder</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code></td>
            <td align="center" data-label="Default"><code class="language-text">2</code></td>
            <td data-label="Description">Determines the size in pixels of the invisible border around a tippy which will prevent it from closing if the cursor left the element.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">interactiveDebounce</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code></td>
            <td align="center" data-label="Default"><code class="language-text">0</code></td>
            <td data-label="Description">Debounces the internal <code class="language-text">onMouseMove</code> handler which determines when an interactive tippy should hide.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">lazy</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">true</code></td>
            <td data-label="Description">Determines if the positioning engine (powered by Popper.js) is created lazily. That is, it's only created when necessary upon showing the tippy for the first time. If you need to access the <code class="language-text">popperInstance</code> synchronously after creation, set this to <code class="language-text">false</code>. Please note that this decreases performance considerably.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">maxWidth</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code>, <code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">350</code></td>
            <td data-label="Description">Determines the maximum width of the tippy - use a number for pixels, or a string to add units such as rem. In CSS, it's defined as <code class="language-text">350px</code> by default. This option applies the width to the <code class="language-text">style</code> attribute of the tippy element.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">multiple</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines if the reference element can have multiple tippys applied to it.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">offset</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code>, <code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">0</code></td>
            <td data-label="Description">Determines the offset of the tippy element. Unlike <code class="language-text">distance</code>, it can work on both axes by using a string in the form <code class="language-text">"x, y"</code>, such as <code class="language-text">"50, 20"</code>. Avoid this option if using <code class="language-text">interactive: true</code>.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">onHidden</code></td>
            <td align="center" data-label="Type"><code class="language-text">Function</code></td>
            <td align="center" data-label="Default"><code class="language-text">noop</code></td>
            <td data-label="Description">Lifecycle function invoked when the tippy has fully transitioned out.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">onHide</code></td>
            <td align="center" data-label="Type"><code class="language-text">Function</code></td>
            <td align="center" data-label="Default"><code class="language-text">noop</code></td>
            <td data-label="Description">Lifecycle function invoked when the tippy begins to transition out. You can cancel hiding by returning <code class="language-text">false</code> from this lifecycle.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">onMount</code></td>
            <td align="center" data-label="Type"><code class="language-text">Function</code></td>
            <td align="center" data-label="Default"><code class="language-text">noop</code></td>
            <td data-label="Description">Lifecycle function invoked when the tippy has been mounted to the DOM.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">onShow</code></td>
            <td align="center" data-label="Type"><code class="language-text">Function</code></td>
            <td align="center" data-label="Default"><code class="language-text">noop</code></td>
            <td data-label="Description">Lifecycle function invoked when the tippy begins to transition in. You can cancel showing by returning <code class="language-text">false</code> from this lifecycle.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">onShown</code></td>
            <td align="center" data-label="Type"><code class="language-text">Function</code></td>
            <td align="center" data-label="Default"><code class="language-text">noop</code></td>
            <td data-label="Description">Lifecycle function invoked when the tippy has fully transitioned in.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">placement</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">"top"</code></td>
            <td data-label="Description">Positions the tippy relative to its reference element. Use the suffix <code class="language-text">-start</code> or <code class="language-text">-end</code> to shift the tippy to the start or end of the reference element, instead of centering it. For example, <code class="language-text">top-start</code> or <code class="language-text">left-end</code>.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">popperOptions</code></td>
            <td align="center" data-label="Type"><code class="language-text">object</code></td>
            <td align="center" data-label="Default"><code class="language-text">{}</code></td>
            <td data-label="Description">Specify custom Popper.js options. See the <a href="https://popper.js.org/popper-documentation.html">Popper.js documentation</a> for more.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">role</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">"tooltip"</code></td>
            <td data-label="Description">Specifies the <code class="language-text">role</code> attribute on the tippy element.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">showOnInit</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines if the tippy will be shown immediately once the instance is created. If using on page load, use <code class="language-text">sticky: true</code> because the reference element can move around while the layout gets built by the browser after initialization (unless the layout is guaranteed to be static).</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">size</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">"regular"</code></td>
            <td data-label="Description">Determines the size of the tippy, defined in CSS. Possible values: <code class="language-text">"small"</code>, <code class="language-text">"regular"</code>, <code class="language-text">"large"</code></td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">sticky</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Ensures the tippy stays stuck to its reference element if it moves around while showing. See the <code class="language-text">updateDuration</code> option to change the transition duration between position updates.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">target</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">""</code></td>
            <td data-label="Description">CSS selector string used for event delegation. See <a href="/tippyjs/misc#event-delegation">Event delegation</a> for more information.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">theme</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">"dark"</code></td>
            <td data-label="Description">Themes added as classes (each separated by a space) to the tippy element's <code class="language-text">classList</code>.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">touch</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">true</code></td>
            <td data-label="Description">Determines if the tippy displays on touch devices.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">touchHold</code></td>
            <td align="center" data-label="Type"><code class="language-text">boolean</code></td>
            <td align="center" data-label="Default"><code class="language-text">false</code></td>
            <td data-label="Description">Determines trigger behavior on touch devices. Instead of a tap on the reference to show and a tap elsewhere to hide the tippy, the reference must be pressed and held for the tippy to show. Letting go from the screen will hide it. To prevent the mobile context menu from appearing, ensure the element cannot be selected using user-select: none; and/or prevent the default behavior for the contextmenu event.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">trigger</code></td>
            <td align="center" data-label="Type"><code class="language-text">string</code></td>
            <td align="center" data-label="Default"><code class="language-text">"mouseenter focus"</code></td>
            <td data-label="Description">The events (each separated by a space) which cause a tippy to show. Possible values: <code class="language-text">"mouseenter"</code>, <code class="language-text">"focus"</code>, <code class="language-text">"click"</code>, <code class="language-text">"manual"</code>. Use <code class="language-text">"manual"</code> to only trigger the tippy programmatically.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">updateDuration</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code></td>
            <td align="center" data-label="Default"><code class="language-text">0</code></td>
            <td data-label="Description">The transition duration between position updates for the <code class="language-text">sticky</code> and <code class="language-text">flipOnUpdate</code> options.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">wait</code></td>
            <td align="center" data-label="Type"><code class="language-text">Function</code></td>
            <td align="center" data-label="Default"><code class="language-text">null</code></td>
            <td data-label="Description">A function that, when defined, will wait until you manually invoke the <code class="language-text">show()</code> method when a tippy is triggered. It takes the tippy instance as the first argument, and the trigger event as the second argument.</td>
        </tr>
        <tr>
            <td data-label="Option"><code class="language-text">zIndex</code></td>
            <td align="center" data-label="Type"><code class="language-text">number</code></td>
            <td align="center" data-label="Default"><code class="language-text">9999</code></td>
            <td data-label="Description">Determines the <code class="language-text">z-index</code> of the tippy.</td>
        </tr>
    </tbody>
</table>

----

## Obligatory Angular Project Stuff

**Generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.**

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### ⚠️ Build ngx-tooltip Library

Any changes made to the ngx-tooltip library will not take affect until it is built.

Run `npm run build.ngx-tooltip` The library build artifacts will be stored in the `dist/ngx-tooltip` directory. Additionally, any styles in the `projects/ngx-tooltip/assets/styles` directory will be copied to `dist/ngx-tooltip/assets/styles`.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Contributors
[<img alt="Michael Riess" src="https://avatars3.githubusercontent.com/u/35740174?s=460&v=4" width="117">](https://github.com/mriess260) |
:---:
|[Michael Riess](https://github.com/michael-riess)|
