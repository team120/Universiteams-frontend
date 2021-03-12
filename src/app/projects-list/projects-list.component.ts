import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Project } from "../model/project/project";
import { University } from "../model/university/university";
import { ProjectsService } from "../projects.service";
import { UniversitiesService } from "../universities.service";

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

  constructor(
    private projectsService: ProjectsService,
    private universitiesService: UniversitiesService
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

  onSubmit() {
    this.projectsService
      .getProjects({ generalSearchTerm: this.generalSearch?.value })
      .subscribe((projects) => {
        this.projects = projects;
      });
  }
}
