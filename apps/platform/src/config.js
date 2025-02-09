// Configuration Object
const configVersion = window.injectedEnv.configVersion ?? "main";

const config = {
  urlApi:
    window.injectedEnv.configUrlApi ??
    'https://moleculartargets.ccdi.cancer.gov/api/v4/graphql',
  googleTagManagerID: window.injectedEnv.configGoogleTagManagerID ?? null,
  efoURL: 
    window.injectedEnv.configEFOURL ??
    'https://raw.githubusercontent.com/CBIIT/mtp-config/main/front-end/ontology-inputs/22.11/diseases_efo.jsonl',
  profile: window.configProfile ?? {},
  downloadsURL: window.injectedEnv.configDownloadsURL ?? '/data/downloads.json',
  geneticsPortalUrl:
    window.injectedEnv.configGeneticsPortalUrl ?? 'https://genetics.opentargets.org',

  chopRServer: 'https://openpedcan-api-qa.d3b.io',
  frontendVersion: window.injectedEnv.frontend_version ?? '1.0.0',
  backendVersion: window.injectedEnv.backend_version ?? '1.0.0',
  mtpConfig: 'https://raw.githubusercontent.com/CBIIT/mtp-config/'+configVersion,
};

export default config;
