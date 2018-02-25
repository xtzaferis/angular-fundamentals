import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import {
    EventsListComponent,
    EventThumbnailComponent, 
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver
} from './events/index';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service';
import { Error404Component } from './errors/404.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent, 
        EventsListComponent, 
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component
    ],
    providers: [
        EventService, 
        ToastrService, 
        EventRouteActivator,
        {
           provide: 'CanDeactivateCreateEvent',
           useValue: checkDirtyState 
        },
        EventListResolver
    ],
    bootstrap: [EventsAppComponent]
})

export class AppModule {
    
}

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty)
        return window.confirm('Do you really want to cancel?')
    else 
        return true;
}