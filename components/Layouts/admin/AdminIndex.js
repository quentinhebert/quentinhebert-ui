import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CustomCard from "../../sections/custom-card";

export default function AdminIndex() {
  const router = useRouter();

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h1" variant="h4">
        Tableau de bord
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
        <CustomCard
          title="Gérer les utilisateurs"
          text="Ajouter, modifier, supprimer, modifier les rôles des utilisateurs..."
          buttonLeft="Voir tous les utilisateurs"
          buttonLeftOnclick={() => router.push("/admin/manage-users")}
        />

        <CustomCard
          title="Gérer les missions"
          text="Ajouter, modifier, supprimer des missions..."
          buttonLeft="Voir toutes les missions"
          buttonLeftOnclick={() => router.push("/admin/manage-missions")}
        />

        <CustomCard
          title="Gérer les fichiers"
          text="Images, PDF..."
          buttonLeft="Voir tous les fichiers"
          buttonLeftOnclick={() => router.push("/admin/manage-files")}
        />
      </Stack>
    </Stack>
  );
}
