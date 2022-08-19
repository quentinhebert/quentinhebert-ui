import * as React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import LeftPartContact from "./LeftPartContact";
import ContactForm from "./ContactForm";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "../../Navigation/Navbars/navbar";
import Footer from "../../Navigation/Footers/Footer";

export default function ContactLayout(props) {
  const {} = props;

  /********** ANIMATION **********/
  const [ref, inView] = useInView();
  const variants = (key) => {
    if (key === 0)
      return {
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 1, delay: 0 },
        },
        hidden: { opacity: 0, x: -200 },
      };
    return {
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, delay: 0 },
      },
      hidden: { opacity: 0, x: 200 },
    };
  };
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  /********** STYLE **********/
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack width="100%" overflow="hidden">
      <Navbar />
      <Stack
        ref={ref}
        justifyContent="center"
        flexDirection={fullScreen ? "column" : "row"}
        sx={{
          alignItems: "baseline",
          width: "70%",
          margin: "2rem auto",
          height: "100%",
        }}
      >
        <motion.div
          initial="hidden"
          variants={variants(0)}
          animate={controls}
          style={{
            width: fullScreen ? "100%" : "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LeftPartContact />
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(2)}
          animate={controls}
          style={{
            width: fullScreen ? "100%" : "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ContactForm />
        </motion.div>
      </Stack>

      <Footer />
    </Stack>
  );
}
