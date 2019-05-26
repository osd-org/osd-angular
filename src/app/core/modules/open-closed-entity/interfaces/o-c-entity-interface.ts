export interface OCEntityInterface {

  /**
   * Current state is open
   */
  readonly isOpen: boolean;

  /**
   * Set open state
   */
  open(): void;

  /**
   * Set close state
   */
  close(): void;
}
