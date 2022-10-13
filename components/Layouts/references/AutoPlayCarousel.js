import React from "react"
import styled from "styled-components"
import ItemsCarousel from "react-items-carousel"
import { Box, Tooltip, useMediaQuery } from "@mui/material"

const autoPlayDelay = 3000

const Wrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
`

const SlideItem = styled.div`
  height: 200px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`

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
          <SlideItem key={index} style={{ backgroundColor: "transparent" }}>
            <Tooltip title={ref.label}>
              <Box
                component="img"
                width={"5rem"}
                src={ref.logo_url}
                alt={ref.label}
                sx={{
                  filter: "grayscale(100%)",
                  "&:hover": { filter: "grayscale(0)" },
                }}
              />
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
