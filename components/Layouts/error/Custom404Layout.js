import Link from "next/link";
import Footer from "../../Navigation/Footers/Footer";
import Navbar from "../../Navigation/Navbars/navbar";
import { Button, Stack, Typography } from "@mui/material";

export default function Custom404Layout() {
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
          404
        </Typography>
        <Typography>Oops, that page doesn't exist...</Typography>
        <Link href="/">
          <Button variant="contained">Go back home 🚗</Button>
        </Link>
      </Stack>

      <Footer />
    </>
  );
}
