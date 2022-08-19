import useBoop from "use-boop";
import { animated } from "react-spring";

export default function Boop({ children }) {
  const [style, trigger] = useBoop({
    rotation: 45,
    timing: 150,
    scale: 1.3,
    delay: 0,
  });

  return (
    <animated.div
      style={{ ...style, alignItems: "center", display: "flex" }}
      onMouseEnter={trigger}
    >
      {children}
    </animated.div>
  );
}
