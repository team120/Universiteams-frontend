import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LayoutManagerService } from "src/app/general-service/layout-manager/layout-manager.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent {
  searchBarForm = new FormGroup({
    generalSearch: new FormControl(""),
  });

  constructor(
    private router: Router,
    private layoutManager: LayoutManagerService
  ) {}

  isMobile = this.layoutManager.isMobile();

  get generalSearch() {
    return this.searchBarForm.get("generalSearch");
  }

  onSubmit() {
    this.router.navigate(["/projects"], {
      queryParams: {
        generalSearch:
          this.generalSearch?.value === ""
            ? undefined
            : this.generalSearch?.value,
      },
      queryParamsHandling: "merge",
    });
  }
}
