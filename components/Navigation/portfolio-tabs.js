import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Slide, Stack, useMediaQuery } from "@mui/material";
import BicolorTitleBand from "../sections/bicolor-title-band";
import theme from "../../config/theme";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function PortfolioTabs(props) {
  const { tab, setTab, categories } = props;

  if (!categories || !categories.length) return <></>;

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  );

  /********** ANIMATION **********/
  const [ref, inView] = useInView();
  const variants = (key) => {
    return {
      visible: {
        opacity: 1,
        scaleY: 1,
        transition: { duration: 0.5, delay: 0 },
      },
      hidden: { opacity: 0, scaleY: 0 },
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

  React.useEffect(() => {
    controls.start("hidden");
    setTimeout(() => {
      controls.start("visible");
    }, 500);
  }, [tab]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const DynamicTitle = () => {
    const title = {
      smallText: categories[tab].catch_phrase_secondary,
      bigText: categories[tab].catch_phrase_primary,
    };
    return (
      <BicolorTitleBand
        secondaryText={title.smallText}
        mainText={title.bigText}
        secondaryColor="#000"
        mainColor={theme.palette.text.secondary}
        padding="2rem"
      />
    );
  };

  return (
    <Stack width="100%" ref={ref}>
      <motion.div initial="hidden" variants={variants(1)} animate={controls}>
        <DynamicTitle />
      </motion.div>
      <Box sx={{ width: "100%", bgcolor: "transparent", marginBottom: "2rem" }}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          textColor="secondary"
          centered
          indicatorColor="secondary"
          allowScrollButtonsMobile
          variant={isMobileOrTablet ? "scrollable" : "standard"}
          sx={{
            flexGrow: 1,
            width: "100%",
          }}
        >
          {categories.map((category, key) => {
            return <Tab key={key} label={category.label} />;
          })}
        </Tabs>
      </Box>
    </Stack>
  );
}
