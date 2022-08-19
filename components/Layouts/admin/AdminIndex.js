import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CustomCard from "../../sections/custom-card";

export default function AdminIndex() {
  const router = useRouter();

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h1" variant="h4">
        Dashboard
      </Typography>
      <Stack
        justifyContent="center"
        direction="row"
        gap={4}
        padding="1rem"
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        {/* <CustomCard
          title="Manage users"
          text="Add, update, delete, update the users roles..."
          buttonLeft="Show all users"
          buttonLeftOnclick={() => router.push("/admin/manage-users")}
        /> */}

        {/* <CustomCard
          title="Manage files"
          text="Images, PDF..."
          buttonLeft="Show all files"
          buttonLeftOnclick={() => router.push("/admin/manage-files")}
        /> */}

        <CustomCard
          title="Edit categories"
          text="Background videos (header), titles, thumbnail..."
          buttonLeft="Edit my categories"
          buttonLeftOnclick={() =>
            router.push("/admin/manage-website/categories")
          }
        />
        <CustomCard
          title="Manage Work page"
          text="Add, edit or delete your videos."
          buttonLeft="Manage my videos"
          buttonLeftOnclick={() => router.push("/admin/manage-website/videos")}
        />
        <CustomCard
          title="Manage references"
          text="Add, edit or delete your references."
          buttonLeft="Manage my references"
          buttonLeftOnclick={() =>
            router.push("/admin/manage-website/references")
          }
        />
        <CustomCard
          title="Manage About page"
          text="Edit your biography, your about main picture and your introduction video."
          buttonLeft="Edit content"
          buttonLeftOnclick={() => router.push("/admin/manage-website/about")}
        />
      </Stack>
    </Stack>
  );
}
