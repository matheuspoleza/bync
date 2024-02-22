interface ByncLogoProps {
  fill?: string;
}

export const ByncLogo: React.FC<ByncLogoProps> = ({ fill = '#ffffff' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80px"
    zoomAndPan="magnify"
    viewBox="0 0 810 809.999993"
    height="80px"
    preserveAspectRatio="xMidYMid meet"
    version="1.0"
  >
    <defs>
      <clipPath id="24d90926ba">
        <path
          d="M 290.789062 243 L 442 243 L 442 394 L 290.789062 394 Z M 290.789062 243 "
          clip-rule="nonzero"
        />
      </clipPath>
      <clipPath id="522882ff83">
        <path
          d="M 290.789062 416 L 519.539062 416 L 519.539062 567 L 290.789062 567 Z M 290.789062 416 "
          clip-rule="nonzero"
        />
      </clipPath>
    </defs>
    <g clip-path="url(#24d90926ba)">
      <path
        fill={fill}
        d="M 366.433594 243 C 324.746094 243 290.949219 276.796875 290.949219 318.480469 L 290.949219 393.964844 L 366.433594 393.964844 C 408.117188 393.964844 441.914062 360.167969 441.914062 318.480469 L 441.914062 243 Z M 366.433594 243 "
        fill-opacity="1"
        fill-rule="nonzero"
      />
    </g>
    <g clip-path="url(#522882ff83)">
      <path
        fill={fill}
        d="M 448.0625 416.042969 L 290.949219 416.042969 L 290.949219 491.523438 C 290.949219 533.203125 324.738281 567.007812 366.433594 567.007812 L 519.039062 567.007812 L 519.039062 487.019531 C 519.039062 447.820312 487.257812 416.042969 448.0625 416.042969 Z M 448.0625 416.042969 "
        fill-opacity="1"
        fill-rule="nonzero"
      />
    </g>
  </svg>
);
