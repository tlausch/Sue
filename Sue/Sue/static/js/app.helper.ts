import { ComponentMetadataFactory, ComponentMetadataType, Component as _Component } from '@angular/core';
import {DEFAULTINTERPOLATION_CONFIG } from '@angular/compiler';

export var partial = (templateUrl):string => {
    return '../../partials/' + templateUrl;
};

export var Component = (obj: ComponentMetadataType) => {
    // inject partial if templateUrl is provided
    obj.templateUrl = partial(obj.templateUrl);
    // obj.interpolation = ['{$', '$}'];
    return  _Component(obj);
}