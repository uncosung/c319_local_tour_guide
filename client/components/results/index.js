import React, { Fragment } from 'react';
import SearchBar from './search-bar';
import SearchResultGuide from './search-result-guide-list';
import SearchPackages from './search-result-package';

export default props => {
  return (
    <Fragment>
      <SearchBar path={props.path} dates={props.dates} handleDates={props.handleDates} toggleStatus={props.toggleStatus} tags={props.tags} location={props.location} handleSearch={props.search}/>
      <SearchResultGuide location={props.location} handleSearch={props.search}/>
      <SearchPackages dates={props.dates} handleDates={props.handleDates} toggleStatus={props.toggleStatus} tags={props.tags} location={props.location} handleSearch={props.search}/>
    </Fragment>
  );
};
