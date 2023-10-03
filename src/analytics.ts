/**
 * All the events that can be tracked.
 */
export enum SnapEventType {
  Install = 'Snap Install Clicked',
  Installed = 'Snap Installed',
  InstallationFailed = 'Snap Installation Failed',
  InstallationRejected = 'Snap Installation Rejected',
  Update = 'Snap Update Clicked',
}

/**
 * Snap install event, which is tracked when the user clicks the install button
 * for a Snap.
 */
export type SnapInstallEvent = {
  type: SnapEventType.Install;
  snapId: string;
  version: string;
};

/**
 * Snap installed event, which is tracked when a Snap is installed.
 */
export type SnapInstalledEvent = {
  type: SnapEventType.Installed;
  snapId: string;
  version: string;
};

/**
 * Snap installation failed event, which is tracked when a Snap fails to
 * install, for any reason.
 */
export type SnapInstallationFailedEvent = {
  type: SnapEventType.InstallationFailed;
  snapId: string;
  version: string;
  error: string;
};

/**
 * Snap installation rejected event, which is tracked when a Snap installation
 * is rejected by the user.
 */
export type SnapInstallationRejectedEvent = {
  type: SnapEventType.InstallationRejected;
  snapId: string;
  version: string;
};

/**
 * Snap update event, which is tracked when the user clicks the update button
 * for a Snap.
 */
export type SnapUpdateEvent = {
  type: SnapEventType.Update;
  snapId: string;
  oldVersion: string;
  newVersion: string;
};

export type SnapEvent =
  | SnapInstallEvent
  | SnapInstalledEvent
  | SnapInstallationFailedEvent
  | SnapInstallationRejectedEvent
  | SnapUpdateEvent;

/**
 * Track Snaps Directory events.
 *
 * @param event - The event to track.
 */
export function track(event: SnapEvent): void {
  // TODO: Implement Segment.
  console.log(event);
}
