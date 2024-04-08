enum BelvoResourceType {
  ACCOUNTS = 'ACCOUNTS',
  OWNERS = 'OWNERS',
  TRANSACTIONS = 'TRANSACTIONS',
}

/*
 * For OFDA, you can only select business and retail.
 * */
enum BelvoInstitutionType {
  BUSINESS = 'business', // for business banks (such as Bradesco Business)
  RETAIL = 'retail', // for retail banks (such as Santander Retail)
  FISCAL = 'fiscal', // for fiscal institutions (such as SAT or DIAN)
  EMPLOYMENT = 'employment', // for employment institutions (such as IMSS).
}

enum BelvoEventName {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  PAGE_LOAD = 'PAGE_LOAD',
}

enum BelvoErrorCode {
  LOGIN_ERROR = 'login_error',
  INSTITUTION_DOWN = 'institution_down',
  TOO_MANY_SESSIONS = 'too_many_sessions',
  UNEXPECTED_ERROR = 'unexpected_error',
}

type EventData = {
  eventName: BelvoEventName;
  request_id: string;
  meta_data: {
    error_code: BelvoErrorCode;
    error_message: string;
    institution_name: string;
    timestamp: string;
  };
};

type ExitData = {
  last_encountered_error: {
    message: string;
    code: BelvoErrorCode;
  };
  meta_data: {
    institution_name: string;
    step: 'abandon-survey'; // always set this way
  };
};

type CreateWidgetOptions = {
  access_token?: string;
  institutions?: string[];
  institution_types?: Array<BelvoInstitutionType>;
  access_mode: 'single' | 'recurrent';
  external_id?: string;
  country_codes: Array<'BR' | 'MX' | 'CO'>;
  resources?: BelvoResourceType[];
  locale: 'pt' | 'en' | 'es'; // default is 'en'
  show_close_dialog?: boolean;
  show_abandon_survey?: boolean;
  company_icon?: string;
  company_logo?: string;
  company_name?: string;
  company_benefit_header?: string;
  company_benefit_content?: string;
  opportunity_loss?: string;
  social_proof?: string;
  callback: (link: string, institution: string) => void;
  onEvent?: (data: EventData[]) => void;
  onExit?: (data: ExitData[]) => void;
};

type Widget = {
  build: () => void;
};

interface BelvoSDK {
  createWidget(access_token: string, options: CreateWidgetOptions): Widget;
}

declare const belvoSDK: BelvoSDK;

declare interface Window {
  belvoSDK: BelvoSDK;
}
