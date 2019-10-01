import { Component, OnInit, Input } from "@angular/core";
import { Indicator } from "./indicator.model";

@Component({
  selector: "indicator",
  templateUrl: "./indicator.component.html",
  styleUrls: ["./indicator.component.scss"]
})
export class IndicatorComponent implements OnInit {
  constructor() {}

  @Input()
  indicator: Indicator = new Indicator();

  ngOnInit() {}
}
