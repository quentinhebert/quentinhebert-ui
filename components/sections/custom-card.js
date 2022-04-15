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
    <Card sx={{ width: "400px" }}>
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
        <Button size="small" onClick={buttonLeftOnclick}>
          {buttonLeft}
        </Button>
        {buttonRight && buttonRightOnclick ? (
          <Button size="small" onClick={buttonRightOnclick}>
            {buttonRight}
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
