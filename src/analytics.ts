/**
 * All the events that can be tracked.
 */
export enum SnapEventType {
  Install = 'Snap Install Clicked',
  Installed = 'Snap Installed',
  InstallationFailed = 'Snap Installation Failed',
  InstallationRejected = 'Snap Installation Rejected',
  Update = 'Snap Update Clicked',
  Website = 'Snap Website Clicked',
}

/**
 * Snap install event, which is triggered when the user clicks the install
 * button for a Snap.
 */
export type SnapInstallEvent = {
  type: SnapEventType.Install;
  snapId: string;
  version: string;
};

/**
 * Snap installed event, which is triggered when a Snap is installed.
 */
export type SnapInstalledEvent = {
  type: SnapEventType.Installed;
  snapId: string;
  version: string;
};

/**
 * Snap installation failed event, which is triggered when a Snap fails to
 * install, for any reason.
 */
export type SnapInstallationFailedEvent = {
  type: SnapEventType.InstallationFailed;
  snapId: string;
  version: string;
  error: string;
};

/**
 * Snap installation rejected event, which is triggered when a Snap installation
 * is rejected by the user.
 */
export type SnapInstallationRejectedEvent = {
  type: SnapEventType.InstallationRejected;
  snapId: string;
  version: string;
};

/**
 * Snap update event, which is triggered when the user clicks the update button
 * for a Snap.
 */
export type SnapUpdateEvent = {
  type: SnapEventType.Update;
  snapId: string;
  oldVersion: string;
  newVersion: string;
};

/**
 * The origin of the {@link SnapWebsiteEvent}.
 */
export enum SnapWebsiteOrigin {
  Modal = 'modal',
  Button = 'button',
}

/**
 * Snap website event, which is triggered when the user clicks the website
 * button for a Snap, either in the modal or on the Snap's page.
 */
export type SnapWebsiteEvent = {
  type: SnapEventType.Website;
  snapId: string;
  origin: SnapWebsiteOrigin;
};

export type SnapEvent =
  | SnapInstallEvent
  | SnapInstalledEvent
  | SnapInstallationFailedEvent
  | SnapInstallationRejectedEvent
  | SnapUpdateEvent
  | SnapWebsiteEvent;

/**
 * Track Snaps Directory events.
 *
 * @param event - The event to trigger.
 * @param event.type - The type of event to trigger.
 */
export function track({ type, ...data }: SnapEvent): void {
  window.analytics?.track(type, data);
}
