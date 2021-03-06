// @flow
import { SHOW_ADS, SIMPLE_SITE } from 'config';
import React from 'react';
import ClaimList from 'component/claimList';
import Ads from 'web/component/ads';
import Card from 'component/common/card';
import { useIsMobile, useIsMediumScreen } from 'effects/use-screensize';

type Options = {
  related_to: string,
  nsfw?: boolean,
};

type Props = {
  uri: string,
  claim: ?StreamClaim,
  recommendedContent: Array<string>,
  nextRecommendedUri: string,
  isSearching: boolean,
  search: (string, Options) => void,
  mature: boolean,
  isAuthenticated: boolean,
};

export default function RecommendedContent(props: Props) {
  const { uri, claim, search, mature, recommendedContent, nextRecommendedUri, isSearching, isAuthenticated } = props;
  const isMobile = useIsMobile();
  const isMedium = useIsMediumScreen();

  const stringifiedClaim = JSON.stringify(claim);
  const getRecommendedContent = React.useCallback(() => {
    if (stringifiedClaim) {
      const jsonClaim = JSON.parse(stringifiedClaim);
      if (jsonClaim && jsonClaim.value && jsonClaim.claim_id) {
        const options: Options = { size: 20, related_to: jsonClaim.claim_id, isBackgroundSearch: true };
        if (jsonClaim && !mature) {
          options['nsfw'] = false;
        }
        const { title } = jsonClaim.value;
        if (title && options) {
          search(title, options);
        }
      }
    }
  }, [stringifiedClaim, mature, search]);

  function reorderList(recommendedContent) {
    let newList = recommendedContent;
    if (newList) {
      const index = newList.indexOf(nextRecommendedUri);
      if (index === -1) {
        // This would be weird. Shouldn't happen since it is derived from the same list.
      } else if (index !== 0) {
        // Swap the "next" item to the top of the list
        const a = newList[0];
        newList[0] = nextRecommendedUri;
        newList[index] = a;
      }
    }
    return newList;
  }

  React.useEffect(() => {
    getRecommendedContent();
  }, [uri, getRecommendedContent]);

  return (
    <Card
      isBodyList
      smallTitle={!isMobile && !isMedium}
      className="file-page__recommended"
      title={__('Related')}
      body={
        <ClaimList
          type="small"
          loading={isSearching}
          uris={reorderList(recommendedContent)}
          hideMenu={isMobile}
          injectedItem={
            SHOW_ADS && IS_WEB ? (
              SIMPLE_SITE ? (
                <Ads small type={'google'} uri={uri} />
              ) : (
                !isAuthenticated && <Ads small type={'video'} />
              )
            ) : (
              false
            )
          }
          empty={__('No related content found')}
        />
      }
    />
  );
}
