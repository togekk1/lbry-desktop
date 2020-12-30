// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import Page from 'component/page';
import Card from 'component/common/card';
import Icon from 'component/common/icon';
import ClaimPreviewTile from 'component/claimPreviewTile';

export default function ChannelStakedInfoPage() {
  return (
    <Page>
      <Card
        className="section"
        title={__("What's with these stars?")}
        actions={
          <div>
            <div>
              <Icon
                icon={ICONS.STAR_NOT_WINNING}
                className="channel-staked__indicator channel-staked__indicator--level0"
              />
              <Icon icon={ICONS.STAR} className="channel-staked__indicator channel-staked__indicator--level0" />
              {'amount < 1'}
            </div>
            <div>
              <Icon
                icon={ICONS.STAR_NOT_WINNING}
                className="channel-staked__indicator channel-staked__indicator--level1"
              />
              <Icon icon={ICONS.STAR} className="channel-staked__indicator channel-staked__indicator--level1" />
              {'amount > 1 && amount < 10'}
            </div>
            <div>
              <Icon
                icon={ICONS.STAR_NOT_WINNING}
                className="channel-staked__indicator channel-staked__indicator--level2"
              />
              <Icon icon={ICONS.STAR} className="channel-staked__indicator channel-staked__indicator--level2" />
              {'amount >= 10 && amount < 1000'}
            </div>
            <div>
              <Icon
                icon={ICONS.STAR_NOT_WINNING}
                className="channel-staked__indicator channel-staked__indicator--level3"
              />
              <Icon icon={ICONS.STAR} className="channel-staked__indicator channel-staked__indicator--level3" />
              {'amount >= 1000 && amount < 10000'}
            </div>
            <div>
              <Icon
                icon={ICONS.STAR_NOT_WINNING}
                className="channel-staked__indicator channel-staked__indicator--level4"
              />
              <Icon icon={ICONS.STAR} className="channel-staked__indicator channel-staked__indicator--level4" />
              {'amount >= 10000 && amount < 100000'}
            </div>
            <div>
              <Icon icon={ICONS.STAR_GRADIENT} className="channel-staked__indicator" />
              {'amount >= 1000000'} (turned down to 500,000 for demo - current max is 520k)
            </div>

            <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />

            <h2>For winning claims</h2>
            <div>
              <Icon
                icon={ICONS.STAR}
                className="channel-staked__indicator--controlling channel-staked__indicator channel-staked__indicator--level0"
              />
            </div>
            <div>
              <Icon
                icon={ICONS.STAR}
                className="channel-staked__indicator--controlling channel-staked__indicator channel-staked__indicator--level1"
              />
            </div>
            <div>
              <Icon
                icon={ICONS.STAR}
                className="channel-staked__indicator--controlling channel-staked__indicator channel-staked__indicator--level2"
              />
            </div>
            <div>
              <Icon
                icon={ICONS.STAR}
                className="channel-staked__indicator--controlling channel-staked__indicator channel-staked__indicator--level3"
              />
            </div>
            <div>
              <Icon
                icon={ICONS.STAR}
                className="channel-staked__indicator--controlling channel-staked__indicator channel-staked__indicator--level4"
              />
            </div>
            <div>
              <Icon
                icon={ICONS.STAR_GRADIENT}
                className="channel-staked__indicator--controlling channel-staked__indicator"
              />
            </div>
          </div>
        }
      />

      <div className="section claim-grid">
        <ClaimPreviewTile uri="lbry://The-Dark-Rise-of-Banknotes" />
        <ClaimPreviewTile uri="lbry://zumo---one-life-of-a-cat---20200630---hideout9---PhotoBomb02" />
        <ClaimPreviewTile uri="lbry://reventeen-c-l-heure-vostfr" />
        <ClaimPreviewTile uri="lbry://COTW17#f" />
        <ClaimPreviewTile uri="lbry://is-the-80-ipad-any-good-unboxing#0" />
        <ClaimPreviewTile uri="lbry://@MH/stories#f" />
      </div>
    </Page>
  );
}
