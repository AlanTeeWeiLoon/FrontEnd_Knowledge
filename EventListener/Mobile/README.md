## Mobile Event Listener
#### touchstart

- Similar to mousedown

#### touchmove

- Similar to mousemove

#### touchend

- Similar to mouseup

## Event Object

#### changedTouches
- Touch points list that starts the current event

#### targetTouches
- List of all touch points located on the current DOM element
- List of all touch points on the current object

#### touches
- List of all touch points on the current screen


## Differences
### Different of touch point

PC: 
- mousemove: No mouse click required, but must be on target element
- mouseup: must release on target element only will trigger

Mobile:
- touchmove: Finger must click only will trigger, but finger not on target element still will trigger
- touchend: Not release on target element also will trigger

### Trigger Sequence

touchstart -> touchend -> mousedown -> click -> mouseup

### Different between touchstart and click
- "touchstart" is when finger touch on target element then will trigger, but "click" is when finger touch then released only will trigger