import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../model/project/project";
import { ProjectsService } from "../projects.service";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"],
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  @Input() projectIdInput?: number;
  @Output() close = new EventEmitter();

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    !this.projectIdInput &&
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get("id"));
        if (id !== null)
          this.projectsService.getOneProject(id).subscribe((project) => {
            this.project = project;
          });
      });

    console.log(this.projectIdInput);
    this.projectIdInput &&
      this.projectsService.getOneProject(this.projectIdInput).subscribe((project) => {
        this.project = project;
      });
  }

  goBackToProjects() {
    this.close.emit();
  }
}
