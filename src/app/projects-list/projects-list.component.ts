import { Project } from "../model/project/project";
import { University } from "../model/university/university";
import { projectTypesList } from "../model/project/project-type";
import { SortAttribute } from "../model/general/general.model";

import { ProjectsService } from "../service/projects/projects.service";
import { UniversitiesService } from "../service/universities/universities.service";
import { DeviceDetectorService } from "../service/device-detector/device-detector.service";
import { ProjectDetailComponent } from "../project-detail/project-detail.component";

import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDrawer } from "@angular/material/sidenav";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"],
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  universities: University[] = [];
  isMobile = false;
  sortAttributes: SortAttribute[] = [];
  inAscendingOrder: boolean = true;
  @ViewChild(MatDrawer) filterDrawer?: MatDrawer;

  projectFilterForm = new FormGroup({
    generalSearch: new FormControl(""),
    university: new FormControl(""),
    department: new FormControl(""),
    type: new FormControl(""),
    isDown: new FormControl(""),
    dateFrom: new FormControl(""),
    sortBy: new FormControl(""),
  });

  get generalSearch() {
    return this.projectFilterForm.get("generalSearch");
  }
  get university() {
    return this.projectFilterForm.get("university");
  }
  get department() {
    return this.projectFilterForm.get("department");
  }
  get type() {
    return this.projectFilterForm.get("type");
  }
  get isDown() {
    return this.projectFilterForm.get("isDown");
  }
  get dateFrom() {
    return this.projectFilterForm.get("dateFrom");
  }

  get sortBy() {
    return this.projectFilterForm.get("sortBy");
  }

  get selectedUniversity() {
    return this.universities.find((university) => university.id === this.university?.value);
  }

  get projectTypes() {
    return projectTypesList;
  }

  constructor(
    private projectsService: ProjectsService,
    private universitiesService: UniversitiesService,
    private router: Router,
    private deviceDetectorService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.deviceDetectorService.isMobile().subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.sortAttributes = this.projectsService.getSortAttributes();
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.universitiesService.getUniversities().subscribe((universities) => {
      this.universities = universities;
    });
  }

  generalSearchValid() {
    return this.generalSearch?.value == "";
  }

  openFilterMenu() {
    this.filterDrawer?.toggle();
  }

  openDetails(projectId?: number) {
    projectId && this.router.navigate([`projects/${projectId}`]);
  }

  toggleOrder() {
    this.inAscendingOrder = !this.inAscendingOrder;
  }

  reset() {
    this.projectFilterForm.reset();
    this.inAscendingOrder = true;
  }

  onSubmit() {
    this.projectsService
      .getProjects({
        generalSearchTerm: this.generalSearch?.value,
        universityId: this.university?.value,
        departmentId: this.department?.value,
        type: this.type?.value,
        isDown: this.isDown?.value,
        dateFrom: this.dateFrom?.value,
        sortBy: this.sortBy?.value,
        inAscendingOrder: this.inAscendingOrder,
      })
      .subscribe((projects) => {
        this.projects = projects;
      });
  }
}
