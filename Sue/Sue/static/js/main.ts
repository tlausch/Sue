import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { AppModule } from './app.module';

DEFAULT_INTERPOLATION_CONFIG.start = '{$';
DEFAULT_INTERPOLATION_CONFIG.end = '$}';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);