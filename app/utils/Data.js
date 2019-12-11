// @flow

import Subscription from '../class-models/Subscription';
import Company from '../class-models/Company';
import type {ColorGroup} from './Types';

const xboxLive = new Company({
  id: 'xboxLive',
  name: 'Xbox Live',
  logoURI:
    'https://carlisletheacarlisletheatre.org/images/xbox-logo-png-svg.png',
  colorGroup: {
    color: 'rgb(14, 122, 13)',
    tint1: 'rgb(9, 94, 8)',
    tint2: 'rgb(4, 64, 3)',
  },
});

const netflix = new Company({
  id: 'netflix',
  name: 'Netflix',
  logoURI:
    'https://1000logos.net/wp-content/uploads/2017/11/Netflix-Logo-png.png',
  colorGroup: {
    color: 'rgb(216, 31, 38)',
    tint1: 'rgb(191, 23, 29)',
    tint2: 'rgb(156, 12, 18)',
  },
});

const spotify = new Company({
  id: 'spotify',
  name: 'Spotify',
  logoURI:
    'https://static.spin.com/files/2018/05/Spotify-Logo-1526659588-640x469.png',
  colorGroup: {
    color: 'rgb(30, 215, 97)',
    tint1: 'rgb(23, 189, 84)',
    tint2: 'rgb(17, 168, 72)',
  },
});

const adobe = new Company({
  id: 'adobe',
  name: 'Adobe',
  logoURI: 'https://1000logos.net/wp-content/uploads/2016/10/Adobe-Logo.png',
  colorGroup: {
    color: 'rgb(255, 0, 0)',
    tint1: 'rgb(224, 0, 0)',
    tint2: 'rgb(180, 0, 0)',
  },
});

const hbo = new Company({
  id: 'hbo',
  name: 'HBO',
  logoURI: 'https://cdn.iconscout.com/icon/free/png-512/hbo-1-555167.png',
  colorGroup: {
    color: 'rgb(40, 40, 40)',
    tint1: 'rgb(30, 30, 30)',
    tint2: 'rgb(80, 80, 80)',
  },
  forceTint: true,
});

const att = new Company({
  id: 'att',
  name: 'AT&T',
  logoURI:
    'https://www.stickpng.com/assets/images/5842905ca6515b1e0ad75ab9.png',
  colorGroup: {
    color: 'rgb(0, 168, 224)',
    tint1: 'rgb(0, 145, 190)',
    tint2: 'rgb(0, 132, 179)',
  },
});

const verizon = new Company({
  id: 'verizon',
  name: 'Verizon',
  logoURI:
    'https://www.androidcentral.com/sites/androidcentral.com/files/article_images/2019/05/verizon-logo-check-cropped.png?itok=js3aGW7u',
  colorGroup: {
    color: 'rgb(239, 29, 29)',
    tint1: 'rgb(209, 19, 19)',
    tint2: 'rgb(181, 14, 14)',
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
};

export const SUBSCRIPTIONS = {
  [xboxLive.id]: new Subscription({company: xboxLive}),
  [netflix.id]: new Subscription({company: netflix}),
  [spotify.id]: new Subscription({company: spotify}),
  [adobe.id]: new Subscription({company: adobe}),
  [hbo.id]: new Subscription({company: hbo}),
  [att.id]: new Subscription({company: att}),
  [verizon.id]: new Subscription({company: verizon}),
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
