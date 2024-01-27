tippy('#tooltip-top', {             // Use class or id
  animation: 'scale',         // See docs for more options (there is a lot :) )
  duration: 150,              // Duration for ToolTip Animation
  arrow: true,                // Add ToolTip Arrow
  delay: [0, 50],             // First # = delay in, second # = delay out
  arrowType: 'sharp',         // Sharp or 'round' or remove for none
  theme: 'light',             // Dark is the default
  boundary: 'scrollParent',
  maxWidth: 220,
  interactive: false,
})

tippy('#tooltip-top-interactive', {             // Use class or id
  animation: 'scale',         // See docs for more options (there is a lot :) )
  duration: 150,              // Duration for ToolTip Animation
  arrow: true,                // Add ToolTip Arrow
  delay: [0, 50],             // First # = delay in, second # = delay out
  arrowType: 'sharp',         // Sharp or 'round' or remove for none
  theme: 'light',             // Dark is the default
  boundary: 'scrollParent',
  maxWidth: 220,
  interactive: true,
})

tippy('.tippy-back', {       // Use class or id
  animation: 'scale',         // See docs for more options (there is a lot :) )
  placement: 'right',
  duration: 150,              // Duration for ToolTip Animation
  arrow: true,                // Add ToolTip Arrow
  delay: [0, 50],             // First # = delay in, second # = delay out
  arrowType: 'sharp',         // Sharp or 'round' or remove for none
  theme: 'light',             // Dark is the default
  boundary: 'scrollParent',
  maxWidth: 220,
  offset: "0, 10",
})