// @flow

import Subscription from '../class-models/Subscription';
import Company from '../class-models/Company';

const xboxLive = new Company({
  id: 'xboxLive',
  name: 'Xbox Live',
  logoURI:
    'https://carlisletheacarlisletheatre.org/images/xbox-logo-png-svg.png',
  color: 'rgb(14, 122, 13)',
  tint1: 'rgb(9, 94, 8)',
  tint2: 'rgb(4, 64, 3)',
});

const netflix = new Company({
  id: 'netflix',
  name: 'Netflix',
  logoURI:
    'https://1000logos.net/wp-content/uploads/2017/11/Netflix-Logo-png.png',
  color: 'rgb(216, 31, 38)',
  tint1: 'rgb(191, 23, 29)',
  tint2: 'rgb(156, 12, 18)',
});

const spotify = new Company({
  id: 'spotify',
  name: 'Spotify',
  logoURI:
    'https://static.spin.com/files/2018/05/Spotify-Logo-1526659588-640x469.png',
  color: 'rgb(30, 215, 97)',
  tint1: 'rgb(23, 189, 84)',
  tint2: 'rgb(17, 168, 72)',
});

const adobe = new Company({
  id: 'adobe',
  name: 'Adobe',
  logoURI: 'https://1000logos.net/wp-content/uploads/2016/10/Adobe-Logo.png',
  color: 'rgb(255, 0, 0)',
  tint1: 'rgb(224, 0, 0)',
  tint2: 'rgb(180, 0, 0)',
});

const hbo = new Company({
  id: 'hbo',
  name: 'HBO',
  logoURI: 'https://cdn.iconscout.com/icon/free/png-512/hbo-1-555167.png',
  color: 'rgb(40, 40, 40)',
  tint1: 'rgb(30, 30, 30)',
  tint2: 'rgb(80, 80, 80)',
  forceTint: true,
});

const att = new Company({
  id: 'att',
  name: 'AT&T',
  logoURI:
    'https://www.stickpng.com/assets/images/5842905ca6515b1e0ad75ab9.png',
  color: 'rgb(0, 168, 224)',
  tint1: 'rgb(0, 145, 190)',
  tint2: 'rgb(0, 132, 179)',
});

const verizon = new Company({
  id: 'verizon',
  name: 'Verizon',
  logoURI:
    'https://www.androidcentral.com/sites/androidcentral.com/files/article_images/2019/05/verizon-logo-check-cropped.png?itok=js3aGW7u',
  color: 'rgb(239, 29, 29)',
  tint1: 'rgb(209, 19, 19)',
  tint2: 'rgb(181, 14, 14)',
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
