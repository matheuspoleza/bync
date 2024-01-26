/* eslint-disable jsx-a11y/no-autofocus */
import { useCallback, useMemo, useState } from 'react';

import { TextField } from '@/components/Form';
import { TextArea } from '@/components/Inputs';
import { Modal } from '@/components/Modal';
import { TabGroup } from '@/components/Navigation';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility';

import { FieldLabel } from '../../../components/FieldLabel';
import { useMockImport } from '../../../hooks/useMockImport';
import { FolderSelect } from '../components/FolderSelect';
import { RefreshRateSelect } from '../components/RefreshRateSelect/RefreshRateSelect.component';
import { isSitemapInfoValid } from '../utils/isSitemapInfoValid';
import { isMultiURLInputValid, isURLValid } from '../utils/isUrlValid';
import { exampleLHSStyles, exampleLinkStyles, submitButtonStyles, textAreaStyles } from './ImportFromSitemapModal.css';

const TABS = [
  { label: 'Basic', id: 0 },
  { label: 'Advanced', id: 1 },
];

export interface IImportFromSitemapModal {
  onClose?: VoidFunction;
  onNextClick?: VoidFunction;
}

export const ImportFromSitemapModal: React.FC<IImportFromSitemapModal> = ({ onClose, onNextClick }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [isSitemapUrlValid, setIsSitemapUrlValid] = useState(true);

  const [domains, setDomains] = useState('');
  const [patterns, setPatterns] = useState('');
  const [domainsError, setDomainsError] = useState(false);
  const [urlPatternsError, setUrlPatternsError] = useState(false);
  const [maxPages, setMaxPages] = useState('250');
  const { isUploading: isMovingToURLReview, onImport: onContinue } = useMockImport(() => onNextClick?.());

  const urlErrorMessage = useMemo(() => {
    if (!isSitemapUrlValid) return 'URL is invalid.';
    return undefined;
  }, [isSitemapUrlValid]);

  const onSubmitToContinue = useCallback(() => {
    if (!isURLValid(sitemapUrl)) {
      setActiveTab(0);
      setIsSitemapUrlValid(false);
    } else if (!isMultiURLInputValid(domains)) {
      setDomainsError(true);
    } else if (!isMultiURLInputValid(patterns)) {
      setUrlPatternsError(true);
    }
    if (isURLValid(sitemapUrl) && isSitemapInfoValid(domains, patterns)) {
      onContinue();
    }
  }, [isSitemapUrlValid, sitemapUrl, onContinue]);

  const basicTabContent = (
    <Box gap={16} mt={16} direction="column">
      <div>
        <TextField
          autoFocus
          error={!isSitemapUrlValid}
          caption={
            isSitemapUrlValid ? (
              <Text variant="fieldCaption" className={exampleLHSStyles}>
                e.g.{' '}
                <Text as="span" variant="fieldCaption" className={exampleLinkStyles}>
                  https://www.domain.com/sitemap.xml
                </Text>
              </Text>
            ) : undefined
          }
          onFocus={() => setIsSitemapUrlValid(true)}
          value={sitemapUrl}
          onValueChange={setSitemapUrl}
          label="Sitemap URL"
          placeholder="Enter sitemap URL"
          disabled={isMovingToURLReview}
          errorMessage={!isMovingToURLReview ? urlErrorMessage : ''}
        />
      </div>
      <RefreshRateSelect isDisabled={isMovingToURLReview} />
      <FolderSelect isDisabled={isMovingToURLReview} />
    </Box>
  );

  const advancedTabContent = (
    <Box mt={16} direction="column" gap={16}>
      <div>
        <FieldLabel>Allowed domains</FieldLabel>
        <TextArea.AutoSize
          error={domainsError}
          value={domains}
          placeholder={`subdomain.example.com\nexample.com`}
          onValueChange={setDomains}
          onFocus={() => setDomainsError(false)}
          disabled={isMovingToURLReview}
          className={textAreaStyles}
          caption={domainsError ? 'Invalid URL.' : 'Only crawl URLs for these domains. One per line.'}
        />
      </div>
      <div>
        <FieldLabel>URL patterns</FieldLabel>
        <TextArea.AutoSize
          error={urlPatternsError}
          value={patterns}
          placeholder={`/products/category/*\n/blog/*`}
          onValueChange={setPatterns}
          onFocus={() => setUrlPatternsError(false)}
          disabled={isMovingToURLReview}
          className={textAreaStyles}
          caption={
            urlPatternsError
              ? 'Invalid URL pattern.'
              : 'Only index URLs matching the regex patterns. One per line, evaluated in order.'
          }
        />
      </div>
      <div>
        <TextField
          error={!isSitemapUrlValid}
          caption={isSitemapUrlValid ? 'Value between 1 - 500.' : undefined}
          onFocus={() => setIsSitemapUrlValid(true)}
          value={maxPages}
          onValueChange={(value) => setMaxPages(value)}
          label="Max pages"
          disabled={isMovingToURLReview}
          placeholder="Enter value between 1 - 500"
        />
      </div>
    </Box>
  );

  return (
    <Modal.Container>
      <Modal.Header title="Import from sitemap" onClose={() => onClose?.()} />
      <Box mt={20} mb={24} mx={24} direction="column">
        <TabGroup tabs={TABS} activeTab={activeTab} onChange={setActiveTab} width="fill" />
        {activeTab === 0 ? basicTabContent : advancedTabContent}
      </Box>
      <Modal.Footer>
        <Modal.Footer.Button label="Cancel" variant="secondary" onClick={onClose} />
        <Modal.Footer.Button
          className={submitButtonStyles}
          label={isMovingToURLReview ? '' : 'Continue'}
          disabled={isMovingToURLReview}
          isLoading={isMovingToURLReview}
          onClick={onSubmitToContinue}
        />
      </Modal.Footer>
    </Modal.Container>
  );
};
