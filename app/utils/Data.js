// @flow

import Subscription from '../class-models/Subscription';
import Company from '../class-models/Company';
import type {ColorGroup} from './Types';

export const COMPANY_LOGOS = {
  xboxLive: require('../../assets/xbox.png'),
  netflix: require('../../assets/netflix_logo.png'),
  spotify: require('../../assets/spotify_logo.png'),
  adobe: require('../../assets/adobe.png'),
  hbo: require('../../assets/hbo.png'),
  att: require('../../assets/att/att.png'),
  verizon: require('../../assets/verizon.png'),
  hulu: require('../../assets/hulu/hulu_logo.png'),
  playstationNow: require('../../assets/ps4/playstation.png'),
  github: require('../../assets/github_logo.png'),
  newYorkTimes: require('../../assets/new_york_times/new_york_times.png'),
  amazonPrime: require('../../assets/amazon_prime/amazon_prime.png'),
  amazonAWS: require('../../assets/amazon_aws/amazon_aws.png'),
  apple: require('../../assets/apple_icon.png'),
  wix: require('../../assets/wix/wix_dark.png'),
  nintendoSwitch: require('../../assets/nintendo_switch/nintendo_switch.png'),
  youtubePremium: require('../../assets/youtube/youtube_filled.png'),
  tmobile: require('../../assets/tmobile/tmobile.png'),
  twitch: require('../../assets/twitch/twitch_filled.png'),
  mixer: require('../../assets/mixer/mixer_logo.png'),
  steam: require('../../assets/steam_logo.png'),
  sprint: require('../../assets/sprint/sprint_logo.png'),
};

const xboxLive = new Company({
  id: 'xbox_live',
  name: 'Xbox Live',
  logoURI: COMPANY_LOGOS.xboxLive,
  colorGroup: {
    color: 'rgb(14, 122, 13)',
    tint1: 'rgb(9, 94, 8)',
    tint2: 'rgb(4, 64, 3)',
  },
});

const netflix = new Company({
  id: 'netflix',
  name: 'Netflix',
  logoURI: COMPANY_LOGOS.netflix,
  colorGroup: {
    color: 'rgb(229, 9, 20)',
    tint1: 'rgb(191, 6, 15)',
    tint2: 'rgb(158, 5, 12)',
  },
});

const spotify = new Company({
  id: 'spotify',
  name: 'Spotify',
  logoURI: COMPANY_LOGOS.spotify,
  colorGroup: {
    color: 'rgb(30, 215, 96)',
    tint1: 'rgb(23, 189, 84)',
    tint2: 'rgb(17, 168, 72)',
  },
});

const adobe = new Company({
  id: 'adobe',
  name: 'Adobe',
  logoURI: COMPANY_LOGOS.adobe,
  colorGroup: {
    color: 'rgb(255, 0, 0)',
    tint1: 'rgb(224, 0, 0)',
    tint2: 'rgb(180, 0, 0)',
  },
});

const hbo = new Company({
  id: 'hbo',
  name: 'HBO',
  logoURI: COMPANY_LOGOS.hbo,
  colorGroup: {
    color: 'rgb(40, 40, 40)',
    tint1: 'rgb(30, 30, 30)',
    tint2: 'rgb(80, 80, 80)',
  },
  forceTint: true,
});

const att = new Company({
  id: 'at&t',
  name: 'AT&T',
  logoURI: COMPANY_LOGOS.att,
  colorGroup: {
    color: 'rgb(58, 165, 220)',
    tint1: 'rgb(42, 141, 191)',
    tint2: 'rgb(30, 120, 166)',
  },
});

const verizon = new Company({
  id: 'verizon',
  name: 'Verizon',
  logoURI: COMPANY_LOGOS.verizon,
  colorGroup: {
    color: 'rgb(239, 29, 29)',
    tint1: 'rgb(209, 19, 19)',
    tint2: 'rgb(181, 14, 14)',
  },
});

const hulu = new Company({
  id: 'hulu',
  name: 'Hulu',
  logoURI: COMPANY_LOGOS.hulu,
  colorGroup: {
    color: 'rgb(28, 231, 131)',
    tint1: 'rgb(20, 201, 111)',
    tint2: 'rgb(13, 168, 91)',
  },
});

const playstationNow = new Company({
  id: 'playstation_now',
  name: 'PlayStation Now',
  logoURI: COMPANY_LOGOS.playstationNow,
  colorGroup: {
    color: 'rgb(0, 112, 204)',
    tint1: 'rgb(0, 98, 184)',
    tint2: 'rgb(0, 81, 153)',
  },
});

const github = new Company({
  id: 'github',
  name: 'GitHub',
  logoURI: COMPANY_LOGOS.github,
  colorGroup: {
    color: 'rgb(36, 41, 46)',
    tint1: 'rgb(26, 31, 36)',
    tint2: 'rgb(4, 4, 5)',
  },
  forceTint: true,
});

const newYorkTimes = new Company({
  id: 'the_new_york_times',
  name: 'The New York Times',
  logoURI: COMPANY_LOGOS.newYorkTimes,
  colorGroup: {
    color: 'rgb(18, 18, 18)',
    tint1: 'rgb(38, 37, 37)',
    tint2: 'rgb(56, 53, 53)',
  },
  forceTint: true,
});

const amazonPrime = new Company({
  id: 'amazon_prime',
  name: 'Amazon Prime',
  logoURI: COMPANY_LOGOS.amazonPrime,
  colorGroup: {
    color: 'rgb(0, 169, 225)',
    tint1: 'rgb(0, 147, 196)',
    tint2: 'rgb(0, 126, 168)',
  },
});

const appleTV = new Company({
  id: 'apple_tv',
  name: 'Apple TV',
  logoURI: COMPANY_LOGOS.apple,
  colorGroup: {
    color: 'rgb(34, 35, 36)',
    tint1: 'rgb(28, 29, 31)',
    tint2: 'rgb(14, 15, 15)',
  },
  forceTint: true,
});

const appleMusic = new Company({
  id: 'apple_music',
  name: 'Apple Music',
  logoURI: COMPANY_LOGOS.apple,
  colorGroup: {
    color: 'rgb(34, 35, 36)',
    tint1: 'rgb(28, 29, 31)',
    tint2: 'rgb(14, 15, 15)',
  },
  forceTint: true,
});

const steam = new Company({
  id: 'steam',
  name: 'Steam',
  logoURI: COMPANY_LOGOS.steam,
  colorGroup: {
    color: 'rgb(34, 35, 36)',
    tint1: 'rgb(28, 29, 31)',
    tint2: 'rgb(14, 15, 15)',
  },
  forceTint: true,
});

const wix = new Company({
  id: 'wix',
  name: 'Wix',
  logoURI: COMPANY_LOGOS.wix,
  colorGroup: {
    color: 'rgb(58, 121, 246)',
    tint1: 'rgb(38, 96, 212)',
    tint2: 'rgb(26, 78, 184)',
  },
  forceTint: true,
});

const nintendoSwitchOnline = new Company({
  id: 'nintendo_switch_online',
  name: 'Nintendo Switch Online',
  logoURI: COMPANY_LOGOS.nintendoSwitch,
  colorGroup: {
    color: 'rgb(228, 0, 15)',
    tint1: 'rgb(201, 0, 13)',
    tint2: 'rgb(173, 2, 13)',
  },
  forceTint: true,
});

const youtubePremium = new Company({
  id: 'youtube_premium',
  name: 'Youtube Premium',
  logoURI: COMPANY_LOGOS.youtubePremium,
  colorGroup: {
    color: 'rgb(255, 0, 0)',
    tint1: 'rgb(224, 0, 0)',
    tint2: 'rgb(180, 0, 0)',
  },
});

const amazonAWS = new Company({
  id: 'amazon_aws',
  name: 'Amazon AWS',
  logoURI: COMPANY_LOGOS.amazonAWS,
  colorGroup: {
    color: 'rgb(255, 153, 0)',
    tint1: 'rgb(230, 139, 2)',
    tint2: 'rgb(196, 119, 2)',
  },
});

const sprint = new Company({
  id: 'sprint',
  name: 'Sprint',
  logoURI: COMPANY_LOGOS.sprint,
  colorGroup: {
    color: 'rgb(254, 225, 0)',
    tint1: 'rgb(227, 201, 2)',
    tint2: 'rgb(204, 181, 4)',
  },
});

const tmobile = new Company({
  id: 't-mobile',
  name: 'T-Mobile',
  logoURI: COMPANY_LOGOS.tmobile,
  colorGroup: {
    color: 'rgb(234, 10, 142)',
    tint1: 'rgb(181, 7, 110)',
    tint2: 'rgb(148, 4, 91)',
  },
});

const twitch = new Company({
  id: 'twitch',
  name: 'Twitch',
  logoURI: COMPANY_LOGOS.twitch,
  colorGroup: {
    color: 'rgb(130, 5, 180)',
    tint1: 'rgb(112, 3, 156)',
    tint2: 'rgb(84, 1, 120)',
  },
});

const mixer = new Company({
  id: 'mixer',
  name: 'Mixer',
  logoURI: COMPANY_LOGOS.mixer,
  colorGroup: {
    color: 'rgb(0, 120, 215)',
    tint1: 'rgb(2, 103, 184)',
    tint2: 'rgb(2, 87, 156)',
  },
});

export const COMPANIES = {
  [xboxLive.id]: xboxLive,
  [netflix.id]: netflix,
  [spotify.id]: spotify,
  [adobe.id]: adobe,
  [hbo.id]: hbo,
  [att.id]: att,
  [verizon.id]: verizon,
  [hulu.id]: hulu,
  [playstationNow.id]: playstationNow,
  [github.id]: github,
  [newYorkTimes.id]: newYorkTimes,
  [amazonPrime.id]: amazonPrime,
  [appleTV.id]: appleTV,
  [appleMusic.id]: appleMusic,
  [steam.id]: steam,
  [wix.id]: wix,
  [nintendoSwitchOnline.id]: nintendoSwitchOnline,
  [youtubePremium.id]: youtubePremium,
  [amazonAWS.id]: amazonAWS,
  [sprint.id]: sprint,
  [tmobile.id]: tmobile,
  [twitch.id]: twitch,
  [mixer.id]: mixer,
};

export const SUBSCRIPTIONS = {
  [xboxLive.id]: new Subscription({company: xboxLive}),
  [netflix.id]: new Subscription({company: netflix}),
  [spotify.id]: new Subscription({company: spotify}),
  [adobe.id]: new Subscription({company: adobe}),
  [hbo.id]: new Subscription({company: hbo}),
  [att.id]: new Subscription({company: att}),
  [verizon.id]: new Subscription({company: verizon}),
  [hulu.id]: new Subscription({company: hulu}),
  [playstationNow.id]: new Subscription({company: playstationNow}),
  [github.id]: new Subscription({company: github}),
  [newYorkTimes.id]: new Subscription({company: newYorkTimes}),
  [amazonPrime.id]: new Subscription({company: amazonPrime}),
  [appleTV.id]: new Subscription({company: appleTV}),
  [appleMusic.id]: new Subscription({company: appleMusic}),
  [steam.id]: new Subscription({company: steam}),
  [wix.id]: new Subscription({company: wix}),
  [nintendoSwitchOnline.id]: new Subscription({company: nintendoSwitchOnline}),
  [youtubePremium.id]: new Subscription({company: youtubePremium}),
  [amazonAWS.id]: new Subscription({company: amazonAWS}),
  [sprint.id]: new Subscription({company: sprint}),
  [tmobile.id]: new Subscription({company: tmobile}),
  [twitch.id]: new Subscription({company: twitch}),
  [mixer.id]: new Subscription({company: mixer}),
};

export const COLOR_GRID_VALUES: ColorGroup[] = [
  // Silver
  {
    color: 'rgb(204, 209, 217)',
    tint1: 'rgb(171, 177, 186)',
    tint2: 'rgb(138, 144, 153)',
  },
  // Grey
  {
    color: 'rgb(93, 96, 102)',
    tint1: 'rgb(70, 73, 79)',
    tint2: 'rgb(57, 60, 66)',
  },
  // Coal
  {
    color: 'rgb(34, 35, 36)',
    tint1: 'rgb(28, 29, 31)',
    tint2: 'rgb(14, 15, 15)',
  },
  // Red
  {
    color: 'rgb(224, 68, 65)',
    tint1: 'rgb(191, 47, 44)',
    tint2: 'rgb(168, 33, 30)',
  },
  // Peach
  {
    color: 'rgb(232, 139, 102)',
    tint1: 'rgb(201, 112, 77)',
    tint2: 'rgb(163, 85, 54)',
  },
  // Fade Orange
  {
    color: 'rgb(237, 133, 59)',
    tint1: 'rgb(201, 108, 42)',
    tint2: 'rgb(179, 92, 30)',
  },
  // Orange
  {
    color: 'rgb(242, 138, 34)',
    tint1: 'rgb(207, 105, 21)',
    tint2: 'rgb(163, 79, 10)',
  },
  // Tomato
  {
    color: 'rgb(227, 100, 68)',
    tint1: 'rgb(196, 79, 49)',
    tint2: 'rgb(168, 62, 35)',
  },
  // Redwood
  {
    color: 'rgb(201, 105, 40)',
    tint1: 'rgb(166, 83, 27)',
    tint2: 'rgb(140, 67, 18)',
  },
  // Gold
  {
    color: 'rgb(250, 222, 37)',
    tint1: 'rgb(222, 196, 27)',
    tint2: 'rgb(186, 164, 19)',
  },
  // Mustard
  {
    color: 'rgb(214, 201, 56)',
    tint1: 'rgb(184, 172, 37)',
    tint2: 'rgb(150, 140, 23)',
  },
  // Sage
  {
    color: 'rgb(142, 161, 141)',
    tint1: 'rgb(109, 130, 108)',
    tint2: 'rgb(83, 102, 82)',
  },
  // Olive
  {
    color: 'rgb(87, 125, 85)',
    tint1: 'rgb(63, 97, 61)',
    tint2: 'rgb(45, 74, 44)',
  },
  // Money
  {
    color: 'rgb(57, 191, 48)',
    tint1: 'rgb(38, 153, 31)',
    tint2: 'rgb(28, 133, 23)',
  },
  // Grass
  {
    color: 'rgb(64, 214, 114)',
    tint1: 'rgb(45, 181, 91)',
    tint2: 'rgb(30, 150, 71)',
  },
  // Yoshi
  {
    color: 'rgb(81, 232, 154)',
    tint1: 'rgb(62, 201, 130)',
    tint2: 'rgb(47, 173, 109)',
  },
  // Jade
  {
    color: 'rgb(134, 209, 187)',
    tint1: 'rgb(105, 179, 157)',
    tint2: 'rgb(84, 156, 134)',
  },
  // Coral
  {
    color: 'rgb(143, 217, 219)',
    tint1: 'rgb(114, 192, 194)',
    tint2: 'rgb(85, 161, 163)',
  },
  // Baby Blue
  {
    color: 'rgb(131, 178, 222)',
    tint1: 'rgb(108, 154, 196)',
    tint2: 'rgb(80, 128, 171)',
  },
  // Blue
  {
    color: 'rgb(41, 122, 242)',
    tint1: 'rgb(31, 103, 209)',
    tint2: 'rgb(21, 85, 179)',
  },
  // Navy
  {
    color: 'rgb(35, 80, 145)',
    tint1: 'rgb(23, 63, 117)',
    tint2: 'rgb(13, 44, 84)',
  },
  // Midnight
  {
    color: 'rgb(65, 70, 217)',
    tint1: 'rgb(48, 53, 186)',
    tint2: 'rgb(33, 37, 156)',
  },
  // Purple
  {
    color: 'rgb(154, 59, 227)',
    tint1: 'rgb(129, 41, 196)',
    tint2: 'rgb(102, 26, 161)',
  },
  // Pink
  {
    color: 'rgb(217, 56, 203)',
    tint1: 'rgb(184, 39, 171)',
    tint2: 'rgb(156, 25, 144)',
  },
  // Dark Pink
  {
    color: 'rgb(156, 25, 144)',
    tint1: 'rgb(117, 14, 108)',
    tint2: 'rgb(89, 7, 82)',
  },
  // Hot Pink
  {
    color: 'rgb(230, 55, 110)',
    tint1: 'rgb(201, 30, 83)',
    tint2: 'rgb(173, 24, 71)',
  },
];
