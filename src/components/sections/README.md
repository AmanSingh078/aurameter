# Team Section Component

This component creates a circular team section similar to the TEAM.html page, displaying 40 team members in a circular arrangement.

## Features

- Displays 40 team members in a circular layout
- Interactive member selection with click/hover effects
- Auto-rotation of featured member every 4 seconds
- Responsive design that works on mobile and desktop
- Detailed member information display when selected
- Social media links for each member

## Implementation Details

The component uses React with TypeScript and follows these key patterns:

1. **State Management**: Uses React hooks (useState, useEffect, useRef) to manage:
   - Team member data
   - Current selected member
   - Auto-show functionality
   - Circle positioning calculations

2. **Responsive Design**: Adapts to different screen sizes:
   - Mobile: Smaller member circles (45px)
   - Desktop: Larger member circles (70px)

3. **Animations**: Uses CSS animations for:
   - Fade-in effects when displaying member details
   - Slide-up animations for member information
   - Hover effects on member circles

4. **Performance**: Optimized rendering:
   - Calculates positions only when needed
   - Handles resize events with debouncing
   - Cleans up intervals and event listeners

## Usage

The component is automatically included in the main page layout at `src/app/page.tsx`. It appears after the contact section and before the hello section.

## Customization

To modify the team members:
1. Update the `names` array in the component
2. Modify the `roles` array for different role options
3. Adjust the member generation logic in the `useEffect` hook

To change the styling:
1. Modify the CSS classes in the component
2. Update the global styles in `src/app/globals.css`
3. Adjust the Tailwind classes for responsive behavior