import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from '@alfresco/adf-process-services';
import { TaskListService } from '@alfresco/adf-process-services';
import { StartFormComponent } from '@alfresco/adf-core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.css']
})
export class StartProcessComponent implements OnInit {

  appId: string = null;
  processDefId: string = null;
    
  @ViewChild(StartFormComponent)
  startForm: StartFormComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private processService: ProcessService,
              private taskListService: TaskListService) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params.appId) {
          this.appId = params.appId;
        }
        if (params.processDefId) {
          this.processDefId = params.processDefId;
        }
      });
    }

  public onOutcomeClick(outcome: string) {
    let name = this.generateNewProcessName(this.processDefId);
    let formValues = this.startForm ? this.startForm.form.values : undefined;
    
    var taskId: string = null;
    var processInstanceId: string = null;

    this.processService.startProcess(this.processDefId, name, outcome, formValues, undefined).subscribe(
      res => {
        this.getNextTask(res.id).subscribe(
          taskres => {
            let task = taskres.data[0];
//            this.router.navigate(['/apps', this.appId, 'tasks', task.id]);
              this.router.navigate(['/']);  
        },
          err => this.handleError(err));
      },
      err => this.handleError(err));
  }

  private getNextTask(processInstanceId: string): Observable<any> {
    let taskQuery: any = {
      assignment: "assignee",
      processInstanceId: processInstanceId,
      state: "active"
    };

    return this.taskListService.getTasks(taskQuery);
  }

  private generateNewProcessName(processDefId: string): string {
    var processDefPrefix = processDefId.split(':')[0];
    var now = moment(Date.now()).format('YYYYMMDD HHms');
    return processDefPrefix + ' ' + now;
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
