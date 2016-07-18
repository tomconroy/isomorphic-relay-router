import IsomorphicRelay from 'isomorphic-relay';
import QueryAggregator from 'react-router-relay/lib/QueryAggregator';
import render from './render';

let queryAggregator;

export default function prepareData(renderProps, networkLayer) {
  if (queryAggregator) {
    queryAggregator.updateQueryConfig(renderProps);
  } else {
    queryAggregator = new QueryAggregator(renderProps);
  }

  return IsomorphicRelay.prepareData(
    {
      Container: queryAggregator,
      queryConfig: queryAggregator.queryConfig,
    },
    networkLayer
  ).then(({ data, props: { environment, initialReadyState } }) => ({
    data,
    props: {
      ...renderProps,
      environment,
      initialReadyState,
      queryAggregator,
      render,
    },
  }));
}
