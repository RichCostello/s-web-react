'use strict';
 
import {Route, NotFoundRoute, DefaultRoute} from 'react-router';

import App                                  from './App';
import HomePage                             from './pages/HomePage';
import SearchPage                           from './pages/SearchPage';
import MainFeedPage                         from './pages/MainFeedPage';
import NotFoundPage                         from './pages/NotFoundPage';
import Station                              from './pages/Station';
import Stations                             from './pages/Stations';
import ProfilePage                          from './pages/ProfilePage';
import PostPage                             from './pages/PostPage';
import Activities                           from './pages/ActivityPage'; 
import TermsPage                            from './pages/TermsPage';
import SupportPage                          from './pages/SupportPage';
import PrivacyPage                          from './pages/PrivacyPage';
import DiscoveryPage                        from './pages/DiscoveryPage';
import DiscoverPosts                        from './pages/DiscoveryPage';
import DiscoverStations                     from './pages/DiscoveryPage';
import DiscoverEvents                       from './pages/DiscoveryPage';
import CreatePage                           from './pages/CreatePage';


export default (
  <Route handler={App} path='/'>



    <Route name='Home' path='/' handler={HomePage} />

    <Route name='Privacy' path='/privacy' handler={PrivacyPage} />
    <Route name='Support' path='/support' handler={SupportPage} />
    <Route name='Terms' path='/terms' handler={TermsPage} />

    <Route name='Discovery' path='/discovery' handler={DiscoveryPage} />
    <Route name='DiscoverPosts' path='/discovery/posts' handler={DiscoverPosts} />
    <Route name='DiscoverStations' path='/discovery/stations' handler={DiscoverStations} />
    <Route name='DiscoverEvents' path='/discovery/events' handler={DiscoverEvents} />

    <Route name='Login' path='/login' handler={MainFeedPage} />    
    <Route name='Recover' path='/recover' handler={MainFeedPage} />
    <Route name='UpdatePassword' path='/updatePassword' handler={MainFeedPage} />
    <Route name='Signup' path='/signup' handler={MainFeedPage} />
    <Route name='Search' path='/search' handler={SearchPage} />
    <Route name="Create" path='/create' handler={CreatePage} />
    <Route name='User' path='/user/:username' handler={ProfilePage} />
    <Route name='Feed' path='/feed' handler={MainFeedPage} />

     <Route name='StationFeed' path='/feed/stations' handler={MainFeedPage} />
      <Route name='EventFeed' path='/feed/events' handler={MainFeedPage} />

    <Route name="Activity" path="/activities" handler={Activities} />
    <Route name="Stations" path="/stations" handler={Stations} />
    <Route name="Post" path="/p/:post" handler={PostPage} />
    <Route name="Station" path="/:station" handler={Station} />

    <Route name="Photo" path="create/photo" handler={CreatePage} />
    <Route name="Video" path="create/video" handler={CreatePage} />
    <Route name="Audio" path="create/audio" handler={CreatePage} />
    <Route name="Live" path="create/live" handler={CreatePage} />

    
    <NotFoundRoute name="NotFound" handler={NotFoundPage} />

  </Route>
);