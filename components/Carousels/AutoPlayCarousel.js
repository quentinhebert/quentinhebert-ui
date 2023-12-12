import React from "react"
import ItemsCarousel from "react-items-carousel"
import { Box, Stack, Tooltip } from "@mui/material"
import Image from "next/image"

const autoPlayDelay = 3000

const Wrapper = (props) => <Stack maxWidth="90%" margin="0 auto" {...props} />

const SlideItem = (props) => (
  <Stack
    className="flex-center"
    height="200px"
    sx={{ backgroundColor: "transparent" }}
    {...props}
  />
)

export default class AutoPlayCarousel extends React.Component {
  state = {
    activeItemIndex: 0,
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick = () =>
    this.setState((prevState) => ({
      activeItemIndex:
        (prevState.activeItemIndex + 1) %
        (this.props.references.length - this.props.noOfCards + 1),
    }))

  onChange = (value) => this.setState({ activeItemIndex: value })

  render() {
    const carouselItems = this.props.references
      ? this.props.references.map((ref, index) => (
          <SlideItem key={index}>
            <Tooltip title={ref.label}>
              {/* <Box
                component="img"
                src={ref.logo_url}
                alt={ref.label}
                sx={{
                  width: { xs: "5rem", md: "6rem" },
                  filter: "grayscale(100%)",
                  "&:hover": { filter: "grayscale(0)" },
                }}
              /> */}
              <Box
                sx={{
                  width: { xs: "5rem", md: "6rem" },
                  filter: "grayscale(100%)",
                  "&:hover": { filter: "grayscale(0)" },
                }}
              >
                <Image
                  src={ref.logo_url}
                  alt={ref.label}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                  loading="lazy"
                />
              </Box>
            </Tooltip>
          </SlideItem>
        ))
      : null

    return (
      <Wrapper>
        <ItemsCarousel
          gutter={5}
          numberOfCards={this.props.noOfCards}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={this.onChange}
          children={carouselItems}
        />
      </Wrapper>
    )
  }
}
