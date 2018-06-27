import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const SearchInput = compose(
  withProps({
    containerElement: <div style={{ height: `100px` }} />,
    bounds: {west: 107, north:52, east:108, south:51},
  }),
  lifecycle({
    componentDidMount() {
      const refs = {}
      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.props.onNewPlace(places[0]);
        },
      })
    },
  })
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Введите место"
        className="form-control"
      />
    </StandaloneSearchBox>
  </div>
);

export default SearchInput;
