import { Project } from "../../model/project/project";
import { University } from "../../model/university/university";
import { projectTypesList } from "../../model/project/project-type";
import { SortAttribute } from "../../model/general/general.model";

import { ProjectsService } from "../projects-service/projects.service";
import { UniversitiesService } from "../universities-service/universities.service";
import { LayoutManagerService } from "../../general-service/layout-manager/layout-manager.service";
import { ProjectDetailComponent } from "../project-detail/project-detail.component";

import { ActivatedRoute, Router } from "@angular/router";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDrawer } from "@angular/material/sidenav";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"],
})
export class ProjectsListComponent implements OnInit {
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
    return this.universities.find(
      (university) => university.id === this.university?.value
    );
  }

  get projectTypes() {
    return projectTypesList;
  }

  projects = this.route.queryParams.pipe(
    mergeMap((params) =>
      this.projectsService.getProjects({
        generalSearchTerm: params.generalSearch,
        universityId: params.university,
        departmentId: params.department,
        type: params.type,
        isDown: params.isDown,
        dateFrom: params.dateFrom,
        sortBy: params.sortBy,
        inAscendingOrder: params.inAscendingOrder,
      })
    )
  );

  constructor(
    private projectsService: ProjectsService,
    private universitiesService: UniversitiesService,
    private router: Router,
    private deviceDetectorService: LayoutManagerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.deviceDetectorService.isMobile().subscribe((result) => {
      this.isMobile = result;
    });
    this.sortAttributes = this.projectsService.getSortAttributes();
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

  reset() {
    this.projectFilterForm.reset();
    this.inAscendingOrder = true;
  }

  onSubmit() {
    this.router.navigate(["/projects"], {
      queryParams: {
        generalSearch:
          this.generalSearch?.value === ""
            ? undefined
            : this.generalSearch?.value,
        university:
          this.university?.value === "" ? undefined : this.university?.value,
        department:
          this.department?.value === "" ? undefined : this.department?.value,
        type: this.type?.value === "" ? undefined : this.type?.value,
        isDown: this.isDown?.value === "" ? undefined : this.isDown?.value,
        dateFrom:
          this.dateFrom?.value === "" ? undefined : this.dateFrom?.value,
        sortBy: this.sortBy?.value === "" ? undefined : this.sortBy?.value,
        inAscendingOrder:
          this.sortBy?.value !== null && this.sortBy?.value !== ""
            ? this.inAscendingOrder
            : undefined,
      },
      queryParamsHandling: "merge",
    });
    console.log("sortBy", this.sortBy?.value);
  }
}
