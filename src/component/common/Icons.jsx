// here I have used https://react-svgr.com/playground/ to convert svg to react component
// Here are all the svg Icons that I hae used in this project as a react component

export const CodeIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 256 256"
      {...props}
    >
      <path fill="rgba(255, 255, 255, 0)" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M71.68 97.22 34.74 128l36.94 30.78a12 12 0 1 1-15.36 18.44l-48-40a12 12 0 0 1 0-18.44l48-40a12 12 0 0 1 15.36 18.44Zm176 21.56-48-40a12 12 0 1 0-15.36 18.44L221.26 128l-36.94 30.78a12 12 0 1 0 15.36 18.44l48-40a12 12 0 0 0 0-18.44ZM164.1 28.72a12 12 0 0 0-15.38 7.18l-64 176a12 12 0 0 0 7.18 15.37 11.79 11.79 0 0 0 4.1.73 12 12 0 0 0 11.28-7.9l64-176a12 12 0 0 0-7.18-15.38Z"
      />
    </svg>
  );
  export const QuickPayIcon = ({ width = "100%", height = "100%", color = "currentColor", ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 300 100"
      {...props}
    >
      {/* Background Rectangular Shape */}
      <rect x="0" y="0" width="300" height="100" fill="none" />
      
      {/* QuickPay Text */}
      <text
        x="30"
        y="60"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill={color}
      >
        QuickPay
      </text>
  
      {/* Arrow or Payment Symbol */}
      <path
        d="M240 50 L270 30 L270 70 Z"  // Simple arrow shape pointing to the right
        fill={color}
      />
    </svg>
  );
  
  
  export const HamburgetMenuClose = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 17h18M3 12h18M3 7h18"
      />
    </svg>
  );
//   HamburgetMenuOpen
  
  export const HamburgetMenuOpen = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
      <g fill="none" fillRule="evenodd">
        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
        <path
          fill="currentColor"
          d="m12 14.121 5.303 5.304a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879 6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.303a1.5 1.5 0 1 0 2.122 2.122L12 14.12Z"
        />
      </g>
    </svg>
  );