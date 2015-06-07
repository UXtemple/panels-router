import XRegExp from 'xregexp';

const TRAILING_SLASH_REGEX = /\/$/;
const SCHEMA_REGEX = /https?:\/\//;
// TODO Simplify regex and remove XRegExp dependency
const URI_REGEX = XRegExp(
  '^(?<schema> [^:/?]+ ) ://   # aka protocol   \n\
    (?<host>   [^/?]+  )       # domain name/IP \n\
    (?<path>   [^?]*   ) \\??  # optional path  \n\
    (?<query>  .*      )       # optional query', 'x'
);

function trailingSlash(uri) {
  return TRAILING_SLASH_REGEX.test(uri) ? uri : `${uri}/`;
}

export default function parse(uri) {
  let keys = [];
  // Make sure we always have a trailing slash on the URI
  let nextUri = trailingSlash(uri);

  do {
    const parsed = XRegExp.exec(nextUri, URI_REGEX);

    if (parsed && parsed.schema && parsed.host) {
      let path = parsed.path;

      if (SCHEMA_REGEX.test(parsed.path)) {
        path = parsed.path.split(SCHEMA_REGEX)[0];
        nextUri = parsed.path.replace(path, '');
      } else {
        nextUri = undefined;
      }

      // Get every path 'bit' which is indeed every panel we need to load
      let pathBits = [];
      do {
        path = path.split('/');
        path = path.slice(0, path.length - 1).join('/');
        pathBits.push(path || '/');
      } while(path.length);
      const uniquePathBits = new Set(pathBits.sort());
      // TODO Should we bring the query bit in?
      uniquePathBits.forEach(bit => keys.push(`${parsed.schema}://${parsed.host}${bit}`));
    } else {
      nextUri = undefined;
    }
  } while(nextUri);

  let currentUri = [];
  keys.reduce((prev, key, i) => {
    const keyLastFwdSlash = key.lastIndexOf('/') + 1;
    const sharesRoot = new RegExp(`${key.substr(0, keyLastFwdSlash)}$`);
    return currentUri[i] = trailingSlash(prev + (sharesRoot.test(prev) ? key.substr(keyLastFwdSlash, key.length) : key));
  }, '');

  return keys.map((panelUri, i) => ({panelUri, currentUri: currentUri[i]}));
}
