import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  constructor(private matSnackBar: MatSnackBar) {}

  public openSnackBar(message: string) {
    this.matSnackBar.open(message, "", { duration: 2000, panelClass: "center-snackbar" });
  }
}
