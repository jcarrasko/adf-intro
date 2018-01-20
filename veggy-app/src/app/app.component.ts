import { Component } from '@angular/core';
import { TranslationService, AuthenticationService, AppsProcessService } from '@alfresco/adf-core';
import { ProcessService } from '@alfresco/adf-process-services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ORDERS_APP_NAME, ORDERS_PROCESS_DEF_KEY } from './orders-config'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ordersAppId: number = 1003;
  ordersProcessDefId: string = null; 

  constructor(translationService: TranslationService,
              private authService: AuthenticationService,
              private appsProcessService: AppsProcessService,
              private processService: ProcessService,
              private router: Router) { 
    translationService.use('en');
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  } 

  onOrders() {
    this.startOrdersProcess(ORDERS_APP_NAME, ORDERS_PROCESS_DEF_KEY);
  } 

  private startOrdersProcess(appName: string, processDefKey: string) {
    this.appsProcessService.getDeployedApplicationsByName(appName).subscribe(
      app => { 
        this.ordersAppId = app.id;

        this.getProcessDefinitionByKey(this.ordersAppId, processDefKey).subscribe(
          processDef => {
            this.ordersProcessDefId = processDef[0].id;
            this.router.navigate(['/apps', this.ordersAppId, this.ordersProcessDefId, 'start-process']);
          },
          err => this.handleError(err));
      },
      err => this.handleError(err));
  }

  private getProcessDefinitionByKey(appId: number, key: string): Observable<any> {
    var opts = { 
      'latest': true,
      'appDefinitionId': appId
    };

    return this.processService.getProcessDefinitions(appId);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  } 

}
