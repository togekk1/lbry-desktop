import { connect } from 'react-redux';
import { makeSelectClaimForUri, makeSelectClaimIsNsfw } from 'lbry-redux';
import { doSearch } from 'redux/actions/search';
import { makeSelectRecommendedContentForUri, selectIsSearching } from 'redux/selectors/search';
import { selectUserVerifiedEmail } from 'redux/selectors/user';
import { makeSelectNextUnplayedRecommended } from 'redux/selectors/content';
import RecommendedVideos from './view';

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
  mature: makeSelectClaimIsNsfw(props.uri)(state),
  recommendedContent: makeSelectRecommendedContentForUri(props.uri)(state),
  nextRecommendedUri: makeSelectNextUnplayedRecommended(props.uri)(state),
  isSearching: selectIsSearching(state),
  isAuthenticated: selectUserVerifiedEmail(state),
});

const perform = (dispatch) => ({
  search: (query, options) => dispatch(doSearch(query, options)),
});

export default connect(select, perform)(RecommendedVideos);
