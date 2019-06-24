export interface RushSliderConfig {
    /**
     * Count of visible items
     */
    itemsCount?: number;
  
    /**
     * Sliding speed in ms
     */
    speed?: number;
  
    /**
     * Auto sliding speed in ms or 0 if disabled
     */
    autoSliding?: number;
  
    /**
     * Space around slides in px
     */
    spaceAround?: number;
  
    /**
     * Shift from left side (1 => slideWidth)
     */
    shiftLeft?: number;
  }