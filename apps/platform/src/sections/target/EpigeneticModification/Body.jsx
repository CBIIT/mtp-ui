import React from 'react';

import config from '../../../config';
import { Body as EpigeneticModificationBody } from '../../common/EpigeneticModification';
import Description from './Description';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';

import EPIGENETIC_MODIFICATION_QUERY from './EpigeneticModificationQuery.gql';

function Body({ definition, id, label: symbol }) {
  const summaryRequest = usePlatformApi(
    Summary.fragments.targetEpigeneticModificationSummary
  );

  const variables = { ensemblId: id };
  const dataDownloaderFileStem = `EpigeneticModification-${id}`;
  const configAPI = `${config.mtpConfig}/front-end/page_target`;
  return (
    <EpigeneticModificationBody
      definition={definition}
      id={id}
      label={{ symbol }}
      entity="target"
      variables={variables}
      BODY_QUERY={EPIGENETIC_MODIFICATION_QUERY}
      summaryRequest={summaryRequest}
      Description={Description}
      dataDownloaderFileStem={dataDownloaderFileStem}
      configAPI={configAPI}
    />
  );
}

export default Body;
