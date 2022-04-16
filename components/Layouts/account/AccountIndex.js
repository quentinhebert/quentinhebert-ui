import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CustomCard from "../../sections/custom-card";

export default function AccountIndex() {
  const router = useRouter();

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h1" variant="h4">
        Mon compte
      </Typography>
      <Stack
        justifyContent="center"
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
          title="Mes informations personnelles"
          text="Email, téléphone, nom, prénom..."
          buttonLeft="Afficher"
          buttonLeftOnclick={() => router.push("/account/personal-information")}
        />

        <CustomCard
          title="Gérer les missions"
          text="Ajouter, modifier, supprimer des missions..."
          buttonLeft="Voir toutes les missions"
          buttonLeftOnclick={() => router.push("/admin/missions")}
        />

        <CustomCard
          title="Gérer les missions"
          text="Ajouter, modifier, supprimer, modifier les rôles des utilisateurs..."
        />
      </Stack>
    </Stack>
  );
}
