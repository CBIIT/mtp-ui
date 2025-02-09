import { Suspense, useState, lazy } from 'react';
import { LoadingBackdrop } from 'ui';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'graphiql/graphiql.min.css';

import { fetcher } from '../../utils/global';

import TARGET_ASSOCS from './TargetAssocs.gql';
import DISEASE_ASSOCS from './DiseaseAssocs.gql';
import TARGET_DISEASE_EVIDENCE from './TargetDiseaseEvidence.gql';
import TARGET_ANNOTATION from './TargetAnnotation.gql';
import DISEASE_ANNOTATION from './DiseaseAnnotation.gql';
import DRUG_ANNOTATION from './DrugAnnotation.gql';
import SEARCH_ANNOTATION from './SearchAnnotation.gql';
import SEARCH_ASSOCS from './SearchAssocs.gql';
import PEDCAN from './SomaticAlterationsQuery.gql';


// lazy load GraphiQL and remove Logo and Toolbar
const GraphiQL = lazy(() =>
  import('graphiql').then((module) => {
    module.default.Logo = () => null;
    module.default.Toolbar = () => null;
    return module;
  })
);

const useStyles = makeStyles({
  container: {
    minHeight: '600px',
  },
  buttonMargin: {
    marginBottom: '12px',
  },
});

function APIPage() {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  return (
    <>
      <Typography variant="h4" paragraph>
        API
      </Typography>
      <Typography paragraph>
        The Molecular Targets Platform is powered by a GraphQL API that supports
        graphical queries for a single entity or target-disease association
        across our knowledge graph. Please note that our API is optimised for a single query.
      </Typography>
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={3} xl={2}>
          <Typography variant="h5" paragraph>
            Example queries
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Target-disease association
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find targets associated with a specific disease or phenotype
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(DISEASE_ASSOCS.loc.source.body)}
                >
                  Run sample query
                </Button>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find diseases and phenotypes associated with a specific target
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(TARGET_ASSOCS.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Target-disease evidence
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Explore evidence that supports a specific target-disease
                  association
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setQuery(TARGET_DISEASE_EVIDENCE.loc.source.body)
                  }
                >
                  Run sample query
                </Button>
                <Typography variant="subtitle2" display="block" paragraph>
                  Explore Somatic Alterations evidence that supports a specific target-disease
                  association
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setQuery(PEDCAN.loc.source.body)
                  }
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Target annotation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find tractability and safety information for a specific target
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(TARGET_ANNOTATION.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Disease annotation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find clinical signs and symptoms for a specific disease
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(DISEASE_ANNOTATION.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Drug annotation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Find approval status and withdrawn and black-box warning for a
                  specific drug
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(DRUG_ANNOTATION.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Search page</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle2" display="block" paragraph>
                  Example query for insulin
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(SEARCH_ANNOTATION.loc.source.body)}
                >
                  Run sample query
                </Button>
                <Typography variant="subtitle2" display="block" paragraph>
                  Example query to get how many entries there are in each entity category for Insulin
                </Typography>
                <Button
                  className={classes.buttonMargin}
                  variant="contained"
                  color="primary"
                  onClick={() => setQuery(SEARCH_ASSOCS.loc.source.body)}
                >
                  Run sample query
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item md={9} xl={10}>
          <Suspense fallback={<LoadingBackdrop/>}>
            <GraphiQL fetcher={fetcher} query={query} />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
}

export default APIPage;
