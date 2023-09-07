// eslint-disable-next-line import/unambiguous
declare module '@metamask/logo' {
  export type ModelViewerOptions = {
    pxNotRatio?: boolean;
    width?: number;
    height?: number;
    followMouse?: boolean;
    slowDrift?: boolean;
  };

  export default class ModelViewer {
    /**
     * The container element for the model viewer. This is the element that
     * will be used to display the model, and should be appended to the DOM.
     */
    public container: HTMLElement;

    constructor(options: ModelViewerOptions);

    /**
     * Make the model look at a specific point.
     *
     * @param coordinates - The coordinates to look at.
     * @param coordinates.x - The x coordinate to look at.
     * @param coordinates.y - The y coordinate to look at.
     */
    public lookAt(coordinates: { x: number; y: number }): void;

    /**
     * Set whether the model should follow the mouse.
     *
     * @param followMouse - Whether the model should follow the mouse.
     */
    public setFollowMouse(followMouse: boolean): void;

    /**
     * Stop the animation. This should be called when the model is no longer
     * visible, to prevent unnecessary resource usage.
     */
    public stopAnimation(): void;
  }
}
