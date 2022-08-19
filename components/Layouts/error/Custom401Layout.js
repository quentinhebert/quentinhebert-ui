import Link from "next/link";
import Footer from "../../Navigation/Footers/Footer";
import Navbar from "../../Navigation/Navbars/navbar";
import { Button, Stack, Typography } from "@mui/material";

export default function Custom401Layout() {
  return (
    <>
      <Navbar />
      <Stack
        justifyContent="center"
        alignItems="center"
        height="400px"
        spacing={2}
      >
        <Typography color="secondary" sx={{ fontSize: "2rem" }}>
          401
        </Typography>
        <Typography>Access denied... I will call the police !</Typography>
        <Link href="/">
          <Button variant="contained">Go back home 🚗</Button>
        </Link>
      </Stack>
      <Footer bgColor={(theme) => theme.palette.background.main} />
    </>
  );
}
