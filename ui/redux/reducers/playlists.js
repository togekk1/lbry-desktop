// @flow
import { handleActions } from 'util/redux-utils';
import * as ACTIONS from 'constants/action_types';

type PlaylistItem = {
  url: string,
  leftOff: number,
  added?: Date,
};

type Playlist = {
  items: Array<PlaylistItem>,
  published: boolean,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  collectionClaimId: ?string,
  builtin: boolean,
};

type PlaylistState = {
  lists: { [string]: Playlist },
};
// find some way to store resolved pl={url} collection playlists that are not saved
// find some way to copy url collection playlists to saved/sidebar playlists
const defaultState: PlaylistState = {
  lists: {
    watchlater: {
      items: [{ url: 'lbry://@seriously#5/seriouspublish#c', leftOff: 0 }],
      published: false,
      name: 'Watch Later',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      collectionClaimId: undefined,
      builtin: true,
    },
    favorites: {
      items: [
        { url: 'lbry://@seriously#5/seriouspublish#c', leftOff: 0 },
        { url: 'lbry://@JIGGYTOM#4/niece#a', leftOff: 0 },
        { url: 'lbry://@Karmakut#7/my-new-favorite-vehicle-in-squad-ft#4', leftOff: 0 },
      ],
      published: false,
      name: 'Watch Later',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      collectionClaimId: undefined,
      builtin: true,
    },
    // randomid to start with, id becomes
    mygarbageid: {
      items: [],
      name: 'garbage',
      userList: true,
      saved: true,
    },
  },
};

export default handleActions(
  {
    [ACTIONS.PLAYLIST_CREATE]: (state, action) => {
      const { name, params } = action.data; // { id:
      const newListTemplate = {
        published: false,
        name: undefined,
        items: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        collectionClaimId: undefined,
        builtin: false,
      };

      const newList = Object.assign({}, newListTemplate, { ...params });
      const { lists } = state;
      const newLists = Object.assign({}, lists, { [name]: newList });

      return {
        ...state,
        lists: newLists,
      };
    },

    [ACTIONS.PLAYLIST_DELETE]: (state, action) => {
      const { lists } = state;
      const { name } = action.data;
      if (lists && lists[name] && lists[name].userList) {
        delete lists[name];
      }
      return Object.assign({}, state, {
        lists,
      });
    },

    [ACTIONS.PLAYLIST_UPDATE]: (state, action) => {
      // update playlist params
      const { lists } = state;
      const { name, params } = action.data; // { id:

      const list = lists[name];

      return Object.assign({}, state, {
        lists,
      });
    },
  },
  defaultState
);
