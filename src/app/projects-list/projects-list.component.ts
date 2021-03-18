import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Project } from "../model/project/project";
import { University } from "../model/university/university";
import { ProjectsService } from "../projects.service";
import { UniversitiesService } from "../universities.service";
import { ProjectDetailComponent } from "../project-detail/project-detail.component";
import { projectTypesList } from "../model/project/project-type";

@Component({
  selector: "app-projects-list",
  animations: [
    trigger("openFilterMenu", [
      state(
        "closed",
        style({
          display: "none",
        })
      ),
      state(
        "open",
        style({
          display: "block",
        })
      ),
      transition("closed => open", [animate("0.2s ease-in-out")]),
      transition("open => closed", [animate("0.2s ease-in-out")]),
    ]),
  ],
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"],
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  isFilterMenuOpen = false;
  universities: University[] = [];

  projectFilterForm = new FormGroup({
    generalSearch: new FormControl(""),
    university: new FormControl(""),
    department: new FormControl(""),
    type: new FormControl(""),
    isDown: new FormControl(""),
    dateFrom: new FormControl(""),
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

  get selectedUniversity() {
    return this.universities.find((university) => university.id === this.university?.value);
  }

  get projectTypes() {
    return projectTypesList;
  }

  constructor(
    private projectsService: ProjectsService,
    private universitiesService: UniversitiesService,
    private detailView: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.universitiesService.getUniversities().subscribe((universities) => {
      this.universities = universities;
    });
  }

  openFilterMenu() {
    this.isFilterMenuOpen = this.isFilterMenuOpen ? false : true;
  }

  openDetails(project: Project) {
    // We need the ID if we don't want to pass the entire project
    const detailRef = this.detailView.open(ProjectDetailComponent, { data: project });
    detailRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`); // Just Testing
    });
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
      })
      .subscribe((projects) => {
        this.projects = projects;
      });
  }
}
