import { styled } from "@mui/material/styles"
import {
  Tooltip,
  Box,
  Fade,
  Typography,
  tooltipClasses,
  Stack,
} from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import SmallTitle from "../Titles/small-title"

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip
    classes={{ popper: className }}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
    arrow
    enterTouchDelay={0}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiTooltip-arrow": {
    color: "#000",
    stroke: `1px solid ${theme.palette.secondary.main}`,
    fontSize: 20,
    width: 20,
    "&::before": {
      border: `1px solid ${theme.palette.secondary.main}`,
      backgroundColor: "#000",
      boxSizing: "border-box",
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000",
    color: theme.palette.text.white,
    maxWidth: 220,
    padding: "1rem",
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}))

export default function CustomTooltip({ show, ...props }) {
  return (
    <Box>
      <HtmlTooltip
        title={
          show ? (
            <>
              <Stack
                alignItems="center"
                flexDirection="row"
                marginBottom=".5rem"
              >
                <InfoOutlinedIcon
                  color="secondary"
                  sx={{ marginRight: ".5rem" }}
                />
                <SmallTitle letterSpacing={0} textTransform="initial">
                  {props.title || "Info"}
                </SmallTitle>
              </Stack>
              <Typography fontSize="1rem" lineHeight="1rem">
                {props.text}
              </Typography>
              {props.content}
            </>
          ) : (
            ""
          )
        }
      >
        <Box {...props} />
      </HtmlTooltip>
    </Box>
  )
}
