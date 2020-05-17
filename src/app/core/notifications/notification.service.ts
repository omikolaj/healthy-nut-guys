import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar, private readonly zone: NgZone) {}

  default(message: string) {
    this.show(message, {
      duration: 2000,
      panelClass: 'default-notification-overlay'
    });
  }

  info(message: string) {
    this.show(message, {
      duration: 2000,
      panelClass: 'info-notification-overlay'
    });
  }

  infoExplicit(message: string, duration: number) {
    this.show(message, {
      duration: duration,
      panelClass: 'info-notification-overlay'
    });
  }

  success(message: string) {
    this.show(message, {
      duration: 2000,
      panelClass: 'success-notification-overlay'
    });
  }

  successExplicit(message: string, duration: number) {
    this.show(message, {
      duration: duration,
      panelClass: 'success-notification-overlay'
    });
  }

  warn(message: string) {
    this.show(message, {
      duration: 2500,
      panelClass: 'warning-notification-overlay'
    });
  }

  error(message: string) {
    this.show(message, {
      duration: 3000,
      panelClass: 'error-notification-overlay'
    });
  }

  banner(message: string, action: string = null) {
    this.show(
      message,
      {
        duration: 0,
        panelClass: 'banner-notification-overlay',
        verticalPosition: 'top'
      },
      action
    );
  }

  private show(message: string, configuration: MatSnackBarConfig, action: string = null) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this.zone.run(() => this.snackBar.open(message, action, configuration));
  }
}
