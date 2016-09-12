import { ComponentMetadataFactory, ComponentMetadataType, Component as _Component } from '@angular/core';

export function isNullOrUndefined(nullable: any):boolean {
    return nullable == null || nullable == undefined;
}

function partial(templateUrl):string {
    return '../../partials/' + templateUrl;
}

export function Component(obj: ComponentMetadataType): any {
    // inject partial if templateUrl is provided
    obj.templateUrl = partial(obj.templateUrl);
    // either define the interpolation here
    // or use DEFAULT_INTERPOLATION_CONFIG from @angular/compiler
    // obj.interpolation = ['{$', '$}'];
    return  _Component(obj);
}