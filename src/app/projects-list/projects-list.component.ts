import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Project } from "../model/project/project";
import { University } from "../model/university/university";
import { ProjectsService } from "../projects.service";
import { UniversitiesService } from "../universities.service";
import { ProjectDetailComponent } from "../project-detail/project-detail.component";
import { projectTypesList } from "../model/project/project-type";
import { MatDrawer } from "@angular/material/sidenav";
import { DeviceDetectorService } from "../device-detector.service";
import { SortAttribute } from "../model/general/general.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"],
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  universities: University[] = [];
  isMobile = false;
  sortAttributes: SortAttribute[];
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
    deviceDetectorService: DeviceDetectorService
  ) {
    deviceDetectorService.isMobile().subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.sortAttributes = projectsService.getSortAttributes();
  }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.universitiesService.getUniversities().subscribe((universities) => {
      this.universities = universities;
    });
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
