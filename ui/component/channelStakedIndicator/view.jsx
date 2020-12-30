// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import classnames from 'classnames';
import Icon from 'component/common/icon';
import LbcSymbol from 'component/common/lbc-symbol';
import Tooltip from 'component/common/tooltip';
import CreditAmount from 'component/common/credit-amount';

type Props = {
  channelClaim: ChannelClaim,
  large?: boolean,
};

function ChannelStakedIndicator(props: Props) {
  const { channelClaim, large = false } = props;

  if (!channelClaim || !channelClaim.meta) {
    return null;
  }

  let amount = parseFloat(channelClaim.amount) + parseFloat(channelClaim.meta.support_amount);

  const isControlling = channelClaim && channelClaim.meta.is_controlling;

  if (amount < 1 && !isControlling) {
    return null;
  }

  let level = 0;
  switch (true) {
    case amount >= 1 && amount < 10:
      level = 1;
      break;
    case amount >= 10 && amount < 1000:
      level = 2;
      break;
    case amount >= 1000 && amount < 10000:
      level = 3;
      break;
    case amount >= 10000 && amount < 500000:
      level = 4;
      break;
    case amount > 500000:
      level = 5;
      break;
  }

  const className = `channel-staked__indicator--level${level}`;
  const maxBling = level === 5;

  return (
    <Tooltip
      label={
        <div className="channel-staked__tooltip">
          <div className="channel-staked__tooltip-icons">
            <LevelIcon isControlling={isControlling} className={className} size={isControlling ? 14 : 10} />
          </div>

          <div className="channel-staked__tooltip-text">
            <span>{__('Level %current_level%', { current_level: level })}</span>
            <div className="channel-staked__amount">
              <LbcSymbol postfix={<CreditAmount amount={amount} showLBC={false} />} size={14} />
            </div>
          </div>
        </div>
      }
    >
      <div
        className={classnames('channel-staked__wrapper', {
          'channel-staked__wrapper--large': large,
        })}
      >
        <LevelIcon large={large} isControlling={isControlling} className={className} maxBling={maxBling} />
      </div>
    </Tooltip>
  );
}

type LevelIconProps = {
  large?: boolean,
  maxBling?: boolean,
  isControlling: boolean,
  className: ?string,
  size?: number,
};

function LevelIcon(props: LevelIconProps) {
  const { large, isControlling, className, maxBling, size } = props;
  return (
    <Icon
      icon={maxBling ? ICONS.STAR_GRADIENT : isControlling ? ICONS.STAR : ICONS.CIRCLE}
      size={size || (isControlling ? 12 : 10) * (large ? 2 : 1)}
      className={classnames('channel-staked__indicator', className, {
        'channel-staked__indicator--large': large,
        'channel-staked__indicator--controlling': isControlling,
      })}
    />
  );
}

export default ChannelStakedIndicator;
