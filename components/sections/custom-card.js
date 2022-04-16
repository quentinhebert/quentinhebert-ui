import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function CustomCard(props) {
  const {
    sectionName,
    title,
    subtitle,
    text,
    buttonLeft,
    buttonLeftOnclick,
    buttonRight,
    buttonRightOnclick,
  } = props;

  return (
    <Card
      sx={{
        width: { sm: "100%", md: "400px" },
        padding: "0.5rem 1rem 1rem 1rem",
      }}
    >
      <CardContent>
        {sectionName ? (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {sectionName}
          </Typography>
        ) : null}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2">{text}</Typography>
      </CardContent>

      <CardActions>
        {buttonLeft && buttonLeftOnclick ? (
          <Button
            variant="contained"
            size="medium"
            onClick={buttonLeftOnclick}
            sx={{ textTransform: "initial" }}
          >
            {buttonLeft}
          </Button>
        ) : null}
        {buttonRight && buttonRightOnclick ? (
          <Button
            variant="outlined"
            size="medium"
            onClick={buttonRightOnclick}
            sx={{ textTransform: "initial" }}
          >
            {buttonRight}
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
