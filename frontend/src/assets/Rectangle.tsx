import { SVGProps } from 'react';

export const RectangleSvg = (props?: SVGProps<SVGSVGElement>) => {
    return (
      <svg
        viewBox="0 0 200 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        stroke="black"
        strokeWidth={1.0}
        {...props}
      >
        <rect x="0" y="0" width="200" height="100" fill="lightgrey" stroke='grey' />
      </svg>
    );
  }